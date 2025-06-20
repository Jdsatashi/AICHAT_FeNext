import DashboardCard from "@/components/DashboardCard";
import { routes } from "@/constants/route";
import React from "react";

export default function page() {
  const managerCards = [
    {
      color: "btn-gradient btn-primary",
      title: "Manage User",
      titleImage: "/icons/user.svg",
      description: "Manage create, edit, change user password, .etc",
      link: routes.managerUser,
    },
    {
      color: "btn-gradient btn-info",
      title: "Manage Chat Topic",
      titleImage: "/icons/message.svg",
      description: "Add new, edit chat AI topic",
      link: routes.managerTopic,
    },
  ];
  return (
    <div>
      <div className="flex justify-center mt-4 lg:mt-8 shadow-2xl">
        <h1 className="bg-gradient-to-r from-gunmetal to-teal bg-clip-text text-transparent font-black text-4xl w-fit">
          Manager Dashboard
        </h1>
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-8 mx-auto mt-4 lg:mt-8">
        {managerCards.map(({ color, title, titleImage, description, link }) => (
          <DashboardCard
            key={title}
            color={color}
            title={title}
            titleImage={titleImage}
            description={description}
            link={link}
          />
        ))}
      </div>
    </div>
  );
}
