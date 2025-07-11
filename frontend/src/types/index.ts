// src/types/index.ts

export interface Book {
  id: number;
  title: string;
  author: string;
  biography: string;
}
export interface PaginatedBooksResponse {
  books: Book[];
  total_books: number;
  page_size: number;
}