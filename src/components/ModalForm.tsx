/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Modal.tsx
"use client";

import { FormCreateTopic } from "@/types/api";
import React, { useEffect, useRef, useCallback } from "react";
import TopicForm from "./TopicForm";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (data: FormCreateTopic) => void;
  isSubmit: boolean;
  fields: any[];
  formInit: any;
}

const ModalForm: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  handleSubmit,
  isSubmit,
  fields,
  formInit,
}) => {
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
      document.body.style.overflow = "hidden"; // Ngăn cuộn trang chính khi modal mở
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = ""; // Cho phép cuộn lại
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; // Đảm bảo body scroll được bật lại nếu component unmount
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
          <h2 className="text-xl font-semibold text-gray-800">
            Create new Topic
          </h2>
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
        <TopicForm
          onSubmit={handleSubmit}
          isSubmit={isSubmit}
          fields={fields}
          formInit={formInit}
        />
      </div>
    </div>
  );
};

export default ModalForm;
