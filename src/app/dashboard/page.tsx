"use client";

import { getChatTopics } from "@/actions/api/chatTopic";
import { TopicCard } from "@/components/TopicCard";
import { ChatTopic } from "@/types/api";
import React, { useEffect, useState } from "react";

const PageTopic = () => {
  const [topics, setTopics] = useState<ChatTopic[]>([]);
  useEffect(() => {
    const getTopics = async () => {
      const { data, error } = await getChatTopics();
      if (error) {
        console.log(error);
        return;
      }
      setTopics(data.data);
    };
    getTopics();
  }, []);

  return (
    <div className="">
      <div className="xl:container mx-auto px-4 py-8 rounded-3xl">
        <div className="flex justify-between max-md:block glass py-4">
          <div className="flex items-center ms-4">
            <h2 className="text-3xl max-md:text-2xl font-semibold">{`Topic's dashboard`}</h2>
          </div>
          <div className="flex max-md:justify-center items-center me-4">
            <div className="input-floating w-72">
              <input
                type="text"
                placeholder="Search topic"
                className="input"
                id="floatingInput"
              />
              <label className="input-floating-label" htmlFor="floatingInput">
                Search
              </label>
            </div>
          </div>
        </div>
        <div className="flex"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {topics.map((topic: ChatTopic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageTopic;
