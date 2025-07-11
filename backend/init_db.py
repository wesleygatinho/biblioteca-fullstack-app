import sqlite3
import json


connection = sqlite3.connect('data/db.sqlite')

cursor = connection.cursor()

# --- Criar a Tabela 'author' ---

cursor.execute('''
    CREATE TABLE IF NOT EXISTS author (
        id INTEGER PRIMARY KEY,
        name TEXT,
        slug TEXT,
        biography TEXT
    )
''')

# --- Criar a Tabela 'book' ---

cursor.execute('''
    CREATE TABLE IF NOT EXISTS book (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        author_slug TEXT,
        author_bio TEXT,
        authors TEXT,
        publisher TEXT,
        subjects TEXT,
        synopsis TEXT
    )
''')

print("Tabelas 'author' e 'book' criadas com sucesso (se não existiam).")


cursor.execute("SELECT COUNT(*) FROM book")
count = cursor.fetchone()[0]

if count == 0:
    print("A tabela de livros está vazia. A povoar com dados iniciais...")
    
    with open('books.json', 'r') as f:
        books_data = json.load(f)
        for book in books_data:
            
            cursor.execute(
                "INSERT INTO book (title, author, author_slug, publisher) VALUES (?, ?, ?, ?)",
                (book['title'], book['author'], book['author'].lower().replace(' ', '-'), f"Editora do Ano {book['year']}")
            )
    print(f"{len(books_data)} livros inseridos com sucesso.")
else:
    print("A tabela de livros já contém dados. Nenhum dado novo foi inserido.")


# Guarda as alterações e fecha a ligação
connection.commit()
connection.close()

print("Base de dados inicializada com sucesso!")