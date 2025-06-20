import Image from "next/image";
import Link from "next/link";
import React from "react";

const DashboardCard = ({
  color,
  title,
  titleImage,
  description,
  link,
}: {
  color: string;
  title: string;
  titleImage: string;
  description: string;
  link: string;
}) => {
  return (
    <>
      <article className={"rounded-lg shadow-md p-4 glass " + color}>
        <div className="flex items-center">
          <div className="shadow-md rounded-full">
            <Image src={titleImage} alt="bookmark" width={32} height={32} />
          </div>

          <h2 className="text-gunmetal text-2xl font-bold ms-2">{title}</h2>
        </div>

        <p className="text-sm mb-4 text-gunmetal">{description}</p>
        <Link href={link}>
          <button className="btn btn-neutral w-full justify-center">
            ➡️ {title}
          </button>
        </Link>
      </article>
    </>
  );
};

export default DashboardCard;
