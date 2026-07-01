export default function Pagination({
  totalPages = 1,
  params = {},
  onChangeParams,
}) {
  const currentPage = params.page || 1;
  const startPage = Math.max(1, currentPage - 3);
  const endPage = Math.min(totalPages, currentPage + 3);

  const buttonClass =
    "inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none disabled:hover:border-slate-200 disabled:hover:bg-slate-100 disabled:hover:text-slate-400";
  const activeButtonClass =
    "inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-blue-600 bg-blue-600 px-3 text-sm font-bold text-white shadow-sm";

  const handleClick = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    onChangeParams &&
      onChangeParams({
        ...params,
        page: newPage,
      });
  };

  if (totalPages <= 1) return null;

  return (
    <div
      id="pagination"
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
    >
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
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const p = startPage + i;
        return (
          <button
            key={p}
            className={p === currentPage ? activeButtonClass : buttonClass}
            onClick={() => handleClick(p)}
            disabled={p === currentPage}
          >
            {p}
          </button>
        );
      })}
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
    </div>
  );
}
