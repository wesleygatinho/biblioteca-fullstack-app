import json
import sqlite3

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def hello_world():
    return "Hello, World!"

@app.route('/api/v1/books', methods=['GET'])
def get_books():
    # Obtém os parâmetros de paginação da URL.
    page = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=10, type=int)

    # Chama a função get_all_books que agora retorna um dicionário.
    books_data = get_all_books(page=page, page_size=page_size)

    # Retorna o dicionário completo como uma resposta JSON.
    return jsonify(books_data)


@app.route('/api/v1/books/author/<author_slug>', methods=['GET'])
def get_books_by_author(author_slug):
    return jsonify(get_books_by_author_name(author_slug))


@app.route('/api/v1/books/subjects', methods=['GET'])
def get_books_by_subject():
    return jsonify(get_books_by_subject())


@app.route('/api/v1/books/subjects/<subject>', methods=['GET'])
def books_by_subject_slug(subject):
    return jsonify(get_books_by_subject_slug(subject))


@app.route('/api/v1/authors', methods=['GET'])
def get_all_authors():
    return jsonify(get_authors())


@app.route('/api/v1/books', methods=['POST'])
def create_book():
    book_data = request.get_json()
    return jsonify(create_new_book(book_data))

def get_all_books(page=1, page_size=10):
    conn = sqlite3.connect('data/db.sqlite')
    cursor = conn.cursor()

    # Consulta 1: Obter o número total de livros na tabela.
    cursor.execute('SELECT COUNT(*) FROM book')
    total_books = cursor.fetchone()[0]

    # Calcula o deslocamento (offset) para a paginação.
    offset = (page - 1) * page_size

    # Consulta 2: Obter os livros da página atual.
    cursor.execute(f'SELECT * FROM book LIMIT {page_size} OFFSET {offset};')
    books_paginated = cursor.fetchall()

    # Converte os resultados da página para uma lista de dicionários.
    book_list = []
    for book in books_paginated:
        book_dict = {
            'id': book[0],
            'title': book[1],
            'author': book[2],
            'biography': book[4]
        }
        book_list.append(book_dict)

    conn.close()

    # Retorna um dicionário contendo os livros e os metadados de paginação.
    return {
        'books': book_list,
        'total_books': total_books,
        'page_size': page_size,
        'current_page': page
    }


def get_authors():
    conn = sqlite3.connect('data/db.sqlite')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM author;')
    authors = cursor.fetchall()
    author_list = []
    for author in authors:
        author_dict = {
            'id': author[0],
            'title': author[1],
            'slug': author[2],
            'biography': author[3]
        }
        author_list.append(author_dict)
    conn.close()
    return author_list


def get_books_by_author_name(author_slug):
    conn = sqlite3.connect('data/db.sqlite')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM book WHERE author_slug = ?;', (author_slug,))
    books = cursor.fetchall()
    book_list = []
    for book in books:
        book_dict = {
            'id': book[0],
            'title': book[1],
            'author': book[2],
            'biography': book[4],
            'authors': book[5],
            'publisher': book[12],
            'synopsis': book[21],
        }
        book_list.append(book_dict)
    conn.close()
    return book_list


def get_books_by_subject():
    conn = sqlite3.connect('data/db.sqlite')
    cursor = conn.cursor()
    cursor.execute("SELECT subjects FROM book;")
    subjects = cursor.fetchall()
    conn.close()
    return subjects


def get_books_by_subject_slug(subject):
    conn = sqlite3.connect('data/db.sqlite')
    cursor = conn.cursor()
    query = '''
    SELECT title, author, author_slug, author_bio, authors, publisher, synopsis
    FROM book
    WHERE subjects = ?
    '''
    cursor.execute(query, (subject,))
    books = cursor.fetchall()
    book_list = []
    for book in books:
        book_dict = {
            'title': book[0],
            'author': book[1],
            'slug': book[2],
            'biography': book[3],
            'authors': book[4],
            'publisher': book[5],
            'synopsis': book[6],
        }
        book_list.append(book_dict)
    conn.close()
    return book_list


@app.route('/api/v1/books/title/<title_slug>', methods=['GET'])
def get_books_by_title(title_slug):
    return jsonify(get_books_by_title_slug(title_slug))


def create_new_book(book_data):
    conn = sqlite3.connect('data/db.sqlite')
    cursor = conn.cursor()
    title = book_data['title']
    author = book_data['author']
    author_slug = book_data['author_slug']
    author_bio = book_data['author_bio']
    authors = book_data['authors']
    publisher = book_data['publisher']
    synopsis = book_data['synopsis']
    cursor.execute('INSERT INTO book (title, author, author_slug, author_bio, authors, publisher, synopsis) VALUES (?, ?, ?, ?, ?, ?, ?);',
                   (title, author, author_slug, author_bio, authors, publisher, synopsis))
    conn.commit()
    conn.close()
    return {'message': 'Book created successfully.'}, 201


@app.route('/api/v1/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    conn = sqlite3.connect('data/db.sqlite')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM book WHERE id = ?", (book_id,))
    book = cursor.fetchone()
    if book is None:
        conn.close()
        return jsonify({'message': 'Livro não encontrado'}), 404
    cursor.execute("DELETE FROM book WHERE id = ?", (book_id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Livro apagado com sucesso'}), 200


def get_books_by_title_slug(title_slug):
    conn = sqlite3.connect('data/db.sqlite')
    cursor = conn.cursor()
    query = "SELECT * FROM book WHERE title LIKE ?;"
    cursor.execute(query, ('%' + title_slug + '%',))
    books = cursor.fetchall()
    book_list = []
    for book in books:
        book_dict = {
            'id': book[0],
            'title': book[1],
            'author': book[2],
            'biography': book[4]
        }
        book_list.append(book_dict)
    conn.close()
    return book_list