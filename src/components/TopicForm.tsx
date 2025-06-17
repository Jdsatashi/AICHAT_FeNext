/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { ChatTopic } from "@/types/api";

const TopicForm = ({
  fields,
  formInit,
  isSubmit,
  onSubmit,
}: {
  fields: any[];
  formInit: any;
  isSubmit: boolean;
  onSubmit: (data: ChatTopic) => void;
}) => {
  const [formData, setFormData] = useState(formInit);

  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-4"
    >
      {fields.map((field) =>
        field.type !== "select" ? (
          <div key={field.name} className="mb-1">
            <div className="w-96">
              <label className="label-text" htmlFor={field.name}>
                {field.label[0].toUpperCase() + field.label.slice(1)}
              </label>
              <input
                type={field.type}
                placeholder={field.label}
                className="input"
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [field.name]: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        ) : (
          <div className="md:w-96 w-auto mb-1" key={field.name}>
            <label className="label-text" htmlFor={field.name}>
              Pick model
            </label>
            <select
              className="select"
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  [field.name]: e.target.value,
                });
              }}
            >
              {field.options?.map((option: any) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )
      )}

      {/* Modal Footer - Submit Button */}
      <div className="flex justify-center pt-3 border-t border-gray-200 mt-4">
        <button
          type="submit"
          className="btn btn-gradient btn-accent w-auto md:w-[80px]"
          disabled={isSubmit}
        >
          {isSubmit ? (
            <span className="loading loading-spinner loading-xl"></span>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default TopicForm;
