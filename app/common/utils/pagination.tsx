import { useLanguage } from "~/features/LanguageTranslation/context/LanguageContext";
import translations from "~/features/LanguageTranslation/Languagetranslations/pagination/pagination";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  setItemsPerPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="flex flex-wrap items-center justify-between p-3 border-t shadow-md w-full gap-4">
      <div className="flex items-center space-x-2">
        <select
          className="border px-2 py-1 rounded text-sm md:text-base"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {[5, 10, 20, 50].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
          <option value={totalItems}>{t.all}</option>
        </select>
      </div>
      <div className="flex items-center space-x-2  mr-6">
        <button
          className="px-2 py-1 md:px-3 border rounded text-xs md:text-sm"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          {t.first}
        </button>
        <button
          className="px-2 py-1 md:px-3 border rounded  text-xs md:text-sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <span className="px-3 py-1 border rounded text-xs md:text-sm">
          {currentPage} / {totalPages}
        </span>
        <button
          className="px-2 py-1 md:px-3 border rounded text-xs md:text-sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
        <button
          className="px-2 py-1 md:px-3 border rounded  text-xs md:text-sm"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          {t.last}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
