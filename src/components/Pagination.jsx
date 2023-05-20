import React from "react";

function Pagination({ totalBtnPagination, pagination, setPage, currentPage }) {
  let current = currentPage ? currentPage : pagination.page;
  return (
    <div className="btn-group ">
      {Array.from({ length: totalBtnPagination }, (_, i) => i + 1)
        //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        .map((elm) => {
          return (
            <button
              className={
                current === elm
                  ? "btn btn-sm btn-primary"
                  : "btn btn-sm btn-ghost text-neutral text-bold"
              }
              onClick={() => setPage(elm)}
              key={elm}
            >
              {elm}
            </button>
          );
        })}
    </div>
  );
}

export default Pagination;
