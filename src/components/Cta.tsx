import Image from "next/image";
import React from "react";

function Cta() {
  return (
    <section className="w-auto bg-gradient-to-r from-slate-800 to-gray-600 px-6 py-8 rounded-lg text-haiiro  flex justify-center flex-col items-center">
      <div className="btn btn-gradient btn-accent">
        Start AI bot for your self
      </div>
      <h2 className="text-[2rem] font-bold mt-4 text-center">
        Build and Personalize your AI Assistant
      </h2>
      <p className="text-center mt-4">
        Create an AI bot, select OpenAI models, customize creative rate and
        enjoy you customize AI.
      </p>
      <Image
        src="cta.svg"
        alt="cta"
        width={362}
        height={232}
        className="my-4"
      />
    </section>
  );
}

export default Cta;
