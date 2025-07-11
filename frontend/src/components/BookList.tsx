// src/components/BookList.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Book } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'; 
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'; 

interface BookListProps {
  initialBooks: Book[];
}

export function BookList({ initialBooks }: BookListProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // A função para apagar o livro
  async function handleDelete(bookId: number) {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/books/${bookId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Falha ao apagar o livro.');
      }

      alert('Livro apagado com sucesso!');
      router.refresh(); 
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao apagar o livro.');
    }
  }

  const filteredBooks = initialBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Buscar por título ou autor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableCaption>
          {filteredBooks.length > 0
            ? 'Uma lista dos livros disponíveis na sua biblioteca.'
            : 'Nenhum livro encontrado.'}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead className="text-right">Ações</TableHead> 
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBooks.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell className="text-right">
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    
                    <Button variant="destructive" size="sm">Apagar</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tem a certeza absoluta?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isto irá apagar permanentemente
                        o livro "{book.title}" da base de dados.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      
                      <AlertDialogAction onClick={() => handleDelete(book.id)}>
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}