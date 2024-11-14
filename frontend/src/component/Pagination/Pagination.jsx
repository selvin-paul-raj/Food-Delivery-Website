/* eslint-disable react/prop-types */
import React from 'react';

    const Pagination = ({ postsPerPage, length,handlePagination,currentPage}) => {
        const paginationNumbers = [];

        for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
            paginationNumbers.push(i);
        }

        return (
            <nav className="pb-8">
            <ul className="flex justify-center space-x-4">
              {paginationNumbers.map(number => (
                <li key={number}>
                  <button
                    onClick={() => handlePagination(number)}
                    className={`px-4 py-2 ${currentPage === number ? 'bg-green text-white' : 'bg-slate-300'} rounded-lg text-black `}
                  >
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        );
    };
    export default Pagination;