import { routes } from "@/constants/route";
import { ChatTopic } from "@/types/api";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ topic }: { topic: ChatTopic }) => {
  return (
    <div className="card image-full sm:max-w-sm mx-auto">
      <div>
        <Image
          className="rounded-lg"
          src="/Rectbg.svg"
          alt="overlay image"
          fill
        />
      </div>
      <div className="card-body">
        <h2 className="card-title mb-2.5 text-slate-800">{topic.name}</h2>
        <p className="text-slate-800">
          {topic.description || "No description"}
        </p>
        <Link
          href={routes.chat + "/" + topic.id}
          className="btn glass text-indigo-600 font-semibold"
        >
          Talk with {topic.name} ➡️
        </Link>
      </div>
    </div>
  );
};

export default Card;
