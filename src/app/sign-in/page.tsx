import SigninForm from "@/components/forms/SigninForm";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card glass rounded-2xl w-[1200px] text-white sm:max-w-sm">
        <div className="relative w-full h-[100px]">
          <Image
            src="/image-test.webp"
            className="rounded-t-2xl"
            alt="iphones"
            fill
          />
        </div>
        <div className="card-body">
          <h2 className="card-title mb-2 text-white text-3xl text-center">
            SIGN IN
          </h2>
          <SigninForm />
        </div>
      </div>
    </div>
  );
};

export default page;
