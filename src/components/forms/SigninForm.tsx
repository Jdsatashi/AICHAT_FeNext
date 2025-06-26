"use client";

import { signin } from "@/actions/client/signinState";
import React, { useActionState, useEffect } from "react";
import PasswordInput from "../input/PasswordInput";

const SigninForm = () => {
  const [state, action, isPending] = useActionState(signin, undefined);
  useEffect(() => {
    if (state?.errors) {
      console.log(state.errors);
      alert(state.errors.error);
    }
  }, [state]);
  return (
    <>
      <form action={action} className="block">
        <div className="max-w-sm">
          <label
            className="label-text text-medium text-slate-800"
            htmlFor="username"
          >
            Username/Email
          </label>
          <input
            name="username"
            defaultValue={state?.username}
            id="username"
            type="text"
            placeholder="myusername or mymail@la.com"
            className="input max-w-sm text-sm md:text-md mb-4"
          />
          <span className="helper-text hidden">Helper text</span>
        </div>

        <PasswordInput value={null} setValue={() => {}} />
        <button
          type="submit"
          disabled={isPending}
          className="w-auto mx-auto bg-gradient-to-r from-teal to-blue-600 hover:from-teal-600 hover:to-80% px-6 py-2 mt-4 rounded-lg text-haiiro  flex justify-center flex-col items-center"
        >
          <span className="text-xl font-semibold">
            {isPending ? "Loading..." : "Sign In"}
          </span>
        </button>
      </form>
    </>
  );
};

export default SigninForm;
