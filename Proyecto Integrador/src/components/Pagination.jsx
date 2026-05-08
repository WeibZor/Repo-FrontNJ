import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems }) => {
  return (
    <div className="flex items-center justify-between gap-4 mt-6 pt-6 border-t border-white/10">
      <div className="text-sm text-gray-400">
        Mostrando {currentPage * itemsPerPage - itemsPerPage + 1} a {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg p-2 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <div className="flex items-center gap-1">
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            const isNear = Math.abs(page - currentPage) <= 1 || page === 1 || page === totalPages;
            
            if (!isNear && i > 0 && i < totalPages - 1 && currentPage - page > 1) {
              if (i === 1) return <span key={i} className="text-gray-400">...</span>;
              return null;
            }
            
            return (
              <button
                key={i}
                onClick={() => onPageChange(page)}
                className={`min-w-[32px] rounded-lg px-2 py-1 text-sm transition-all ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'hover:bg-white/10 text-gray-400'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg p-2 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
