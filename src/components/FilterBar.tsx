import { ApiQueryParams } from "@/types/api";
import React from "react";

type FilterBarProps = {
  setQueryParams: (params: ApiQueryParams) => void;
  queryParams: ApiQueryParams;
  setShowModal: (show: boolean) => void;
  setShowFilter: (show: boolean) => void;
  title: string;
};

const FilterBar = ({
  setQueryParams,
  queryParams,
  setShowModal,
  setShowFilter,
  title,
}: FilterBarProps) => {
  return (
    <>
      <div className="flex justify-between max-md:block glass py-4">
        <div className="flex items-center ms-4">
          <h2 className="text-3xl max-md:text-2xl font-semibold">{`${title}'s dashboard`}</h2>
          <button
            onClick={() => setShowModal(true)}
            type="button"
            className="btn btn-outline btn-accent ms-2"
          >
            ➡️ Add {title}
          </button>
        </div>
        <div className="flex max-md:justify-center items-center me-4 gap-2">
          <div onClick={() => setShowFilter(true)} className="btn">
            <span className="icon-[tabler--menu-2]"></span>
            Filter
          </div>
          <div className="input-floating w-72">
            <input
              type="text"
              placeholder={`Search ${title}`}
              className="input"
              id="floatingInput"
              value={queryParams.query}
              onChange={(e) => {
                setQueryParams({
                  ...queryParams,
                  query: e.target.value,
                });
              }}
            />
            <label className="input-floating-label" htmlFor="floatingInput">
              Quick search
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterBar;
