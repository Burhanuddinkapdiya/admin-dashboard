import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const paginationControls = [];
  
  for (let i = 1; i <= totalPages; i++) {
    paginationControls.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`mx-1 px-3 py-1 rounded ${
          i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
        }`}
      >
        {i}
      </button>
    );
  }

  return <div className="flex justify-center mt-4">{paginationControls}</div>;
};

export default Pagination;
