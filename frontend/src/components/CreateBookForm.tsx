// src/components/CreateBookForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from './ui/textarea';

export function CreateBookForm() {
  
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const bookData = {
      title: formData.get('title'),
      author: formData.get('author'),
      author_slug: String(formData.get('author')).toLowerCase().replace(/ /g, '-'),
      author_bio: formData.get('author_bio'),
      authors: formData.get('author'),
      publisher: 'Editora Padrão',
      synopsis: formData.get('synopsis'),
    };

    try {
      const response = await fetch('http://localhost:5000/api/v1/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error('Falha ao criar o livro.');
      }

      setOpen(false); 

      
      router.refresh(); 

      alert('Livro criado com sucesso!');

    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao criar o livro.');
    }
  }

  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Adicionar Novo Livro</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Livro</DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo para adicionar um novo livro.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Título
              </Label>
              <Input id="title" name="title" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right">
                Autor
              </Label>
              <Input id="author" name="author" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author_bio" className="text-right">
                Biografia
              </Label>
              <Textarea id="author_bio" name="author_bio" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="synopsis" className="text-right">
                Sinopse
              </Label>
              <Textarea id="synopsis" name="synopsis" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Salvar Livro</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}