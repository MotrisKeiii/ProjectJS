import { useEffect, useState } from "react";

const PAGE_BLOCK_SIZE = 6;

const getBlockStart = (page) =>
  Math.floor((Math.max(1, page) - 1) / PAGE_BLOCK_SIZE) * PAGE_BLOCK_SIZE + 1;

export default function Pagination({
  totalPages = 1,
  params = {},
  onChangeParams,
}) {
  const currentPage = Number(params.page) || 1;
  const [startPage, setStartPage] = useState(() => getBlockStart(currentPage));
  const [advancedFromPage, setAdvancedFromPage] = useState(null);
  const endPage = Math.min(totalPages, startPage + PAGE_BLOCK_SIZE - 1);

  useEffect(() => {
    if (currentPage === advancedFromPage) return;

    if (currentPage < startPage || currentPage > endPage) {
      setStartPage(getBlockStart(currentPage));
    }
  }, [advancedFromPage, currentPage, endPage, startPage]);

  const buttonClass =
    "inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none";
  const activeButtonClass =
    "inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-blue-600 bg-blue-600 px-3 text-sm font-bold text-white shadow-sm";

  const handleClick = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;

    const isLastPageInBlock = newPage === endPage && endPage < totalPages;
    setAdvancedFromPage(isLastPageInBlock ? newPage : null);

    if (isLastPageInBlock) {
      setStartPage(endPage + 1);
    } else if (newPage < startPage || newPage > endPage) {
      setStartPage(getBlockStart(newPage));
    }

    onChangeParams?.({
      ...params,
      page: newPage,
    });
  };

  const pageNumbers = Array.from(
    { length: Math.max(0, endPage - startPage + 1) },
    (_, index) => startPage + index,
  );

  return (
    <div
      id="pagination"
      className="mt-8 flex min-h-10 flex-wrap items-center justify-center gap-2"
    >
      {totalPages > 1 ? (
        <>
          <button
            className={buttonClass}
            onClick={() => handleClick(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button
            className={buttonClass}
            onClick={() => handleClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              className={page === currentPage ? activeButtonClass : buttonClass}
              onClick={() => handleClick(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          ))}
          <button
            className={buttonClass}
            onClick={() => handleClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            className={buttonClass}
            onClick={() => handleClick(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </>
      ) : null}
    </div>
  );
}
