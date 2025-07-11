// src/app/page.tsx

import { CreateBookForm } from '@/components/CreateBookForm'; 
import { BookList } from '@/components/BookList';
import { PaginationControls } from '@/components/PaginationControls'; 
import { PaginatedBooksResponse } from '@/types';

const PAGE_SIZE = 10; 


async function getBooks(page: number): Promise<PaginatedBooksResponse> {
  const response = await fetch(
    `http://localhost:5000/api/v1/books?page=${page}&page_size=${PAGE_SIZE}`,
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error('Falha ao buscar os livros da API');
  }

  return response.json();
}


export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;

  
  const data = await getBooks(page);

  const totalPages = Math.ceil(data.total_books / PAGE_SIZE);

  return (
    <main className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Biblioteca Murabei</h1>
        <CreateBookForm />
      </div>

      
      <BookList initialBooks={data.books} />

      
      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
      />
    </main>
  );
}