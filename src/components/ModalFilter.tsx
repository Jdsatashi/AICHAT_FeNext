import { ApiQueryParams } from "@/types/api";
import React, { useCallback, useEffect, useRef } from "react";

interface ModalFilterProps {
  isOpen: boolean;
  onClose: () => void;
  queryParams: ApiQueryParams;
  setQueryParams: (params: ApiQueryParams) => void;
}

const ModalFilter = ({
  isOpen,
  onClose,
  queryParams,
  setQueryParams,
}: ModalFilterProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  // Xử lý đóng modal khi nhấn phím Esc
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto relative transform transition-all duration-300 ease-out scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 border-b border-gray-200 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Filter</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
            aria-label="Đóng modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <form onSubmit={() => onClose()}>
          <div className="flex flex-col space-y-4">
            <div className="w-auto lg:w-full">
              <label className="label-text" htmlFor="query">
                Search
              </label>
              <input
                type="text"
                placeholder="topic name..."
                className="input"
                id="query"
                name="query"
                value={queryParams.query}
                onChange={(e) =>
                  setQueryParams({ ...queryParams, query: e.target.value })
                }
              />
            </div>
            <div className="w-auto lg:w-full">
              <label className="label-text" htmlFor="items">
                Items
              </label>
              <input
                type="number"
                placeholder="Amount of item"
                className="input"
                id="items"
                name="limit"
                value={queryParams.limit}
                onChange={(e) =>
                  setQueryParams({
                    ...queryParams,
                    limit: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="w-auto lg:w-full">
              <label className="label-text" htmlFor="page">
                Page
              </label>
              <input
                type="number"
                placeholder="Name"
                className="input"
                id="page"
                name="page"
                value={queryParams.page}
                onChange={(e) =>
                  setQueryParams({
                    ...queryParams,
                    page: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-gradient btn-accent mt-4 w-full"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalFilter;
