"use server";

import { getChatTopics } from "@/actions/api/chatTopic";
import { getToken } from "@/actions/saveToCookies";
import Card from "@/components/Card";
import Navbar2 from "@/components/Navbar2";
import { ChatTopic } from "@/types/api";
import React from "react";

const page = async () => {
  const accessToken = getToken("access");
  const { data, error } = await getChatTopics(`${accessToken}`);
  console.log(error);
  return (
    <div className="">
      <Navbar2 />
      <h2 className="text-2xl">This is the dashboard</h2>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.data.map((topic: ChatTopic) => (
            <Card key={topic.id} topic={topic} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
