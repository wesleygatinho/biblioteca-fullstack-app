// src/components/PaginationControls.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

export function PaginationControls({
  currentPage,
  totalPages,
}: PaginationControlsProps) {
  
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-between items-center mt-6">
      
      <Button asChild variant="outline" disabled={currentPage <= 1}>
        <Link href={`/?page=${currentPage - 1}`}>Anterior</Link>
      </Button>

      
      <span>
        Página {currentPage} de {totalPages}
      </span>

      
      <Button asChild variant="outline" disabled={currentPage >= totalPages}>
        <Link href={`/?page=${currentPage + 1}`}>Próximo</Link>
      </Button>
    </div>
  );
}