import React from "react";
import FlyonuiScript from "../FlyonuiScript";

const PasswordInput = ({
  value,
  setValue,
}: {
  value: string | null;
  setValue: (value: string) => void;
}) => {
  return (
    <>
      <div className="max-w-sm">
        <label
          className="label-text text-medium text-slate-800"
          htmlFor="password"
        >
          Password
        </label>
        <div className="input max-w-sm">
          {value ? (
            <input
              name="password"
              id="password"
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="●●●●●●●●"
            />
          ) : (
            <div className="input max-w-sm">
              <input
                name="password"
                id="password"
                type="password"
                placeholder="●●●●●●●●"
              />
            </div>
          )}
          <button
            type="button"
            data-toggle-password='{ "target": "#password" }'
            className="block cursor-pointer"
            aria-label="password toggle"
          >
            <span className="icon-[tabler--eye] text-base-content/80 password-active:block hidden size-5 shrink-0"></span>
            <span className="icon-[tabler--eye-off] text-base-content/80 password-active:hidden block size-5 shrink-0"></span>
          </button>
        </div>
        <span className="helper-text hidden">Helper text</span>
      </div>
      <FlyonuiScript />
    </>
  );
};

export default PasswordInput;
