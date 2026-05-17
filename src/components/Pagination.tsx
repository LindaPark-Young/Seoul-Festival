import "./Pagination.css";

interface PaginationProps {
  page: number;
  handlePrev: () => void;
  handleNext: () => void;
  isEnd: boolean;
}

function Pagination({ page, handlePrev, handleNext, isEnd }: PaginationProps) {
  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={page === 1}>
        이전
      </button>
      <span>{page}</span>
      <button onClick={handleNext} disabled={isEnd}>
        다음
      </button>
    </div>
  );
}
export default Pagination;
