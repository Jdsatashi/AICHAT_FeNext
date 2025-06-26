/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { FormCreateTopic } from "@/types/api";
import UserComboBox from "../input/UserComboBox";
import PasswordInput from "../input/PasswordInput";

const TopicForm = ({
  fields,
  formInit,
  isSubmit,
  onSubmit,
  errorFields,
}: {
  fields: any[];
  formInit: any;
  isSubmit: boolean;
  onSubmit: (data: FormCreateTopic) => void;
  errorFields: Record<string, string> | null;
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
      {fields.map((field) => {
        switch (field.type) {
          case "password":
            return (
              <PasswordInput
                key={field.name}
                value={formData[field.name]}
                setValue={(value) => {
                  setFormData({
                    ...formData,
                    [field.name]: value,
                  });
                }}
              />
            );
          case "select":
            return (
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
            );
          case "combobox":
            return (
              <UserComboBox
                key={field.name}
                setInputValue={(value) => {
                  setFormData({
                    ...formData,
                    [field.name]: value,
                  });
                }}
              />
            );
          default:
            return (
              <div key={field.name} className="mb-1">
                <div className="w-96">
                  <label
                    className={
                      "label-text " +
                      (errorFields && errorFields[field.name]
                        ? "text-red-500"
                        : "")
                    }
                    htmlFor={field.name}
                  >
                    {field.label[0].toUpperCase() + field.label.slice(1)}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.label}
                    className={
                      "input" +
                      (errorFields && errorFields[field.name]
                        ? " border-red-500"
                        : "")
                    }
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
                  {errorFields && errorFields[field.name] && (
                    <div className="text-red-500 text-sm">
                      {errorFields[field.name]}
                    </div>
                  )}
                </div>
              </div>
            );
        }
      })}

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
