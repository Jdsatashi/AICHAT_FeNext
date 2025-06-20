"use client";

import { createTopic, getChatTopics } from "@/actions/api/chatTopic";
import { TopicCard } from "@/components/TopicCard";
import ModalForm from "@/components/ModalForm";
import { topicFields, topicInit } from "@/constants/data/topicFields";
import { ChatTopic, FormCreateTopic } from "@/types/api";
import React, { useEffect, useState } from "react";

const PageTopic = () => {
  const [showModal, setShowModal] = useState(false);
  const [topics, setTopics] = useState<ChatTopic[]>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [inputData, setInputData] = useState<FormCreateTopic | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    if (!showModal) {
      const getTopics = async (queries) => {
        const { data, error } = await getChatTopics(queries);
        if (error) {
          console.log(error);
          return;
        }
        setTopics(data.data);
      };
      const queries = {
        query: searchInput,
      };
      getTopics(queries);
    }
  }, [showModal, searchInput]);

  useEffect(() => {
    if (isSubmit && inputData) {
      const submitTopic = async () => {
        inputData.temperature = inputData.temperature / 100;
        const { error } = await createTopic(inputData);
        if (error) {
          alert(error);
        }
      };
      submitTopic();
      setIsSubmit(false);
      setShowModal(false);
    }
  }, [inputData, isSubmit]);

  const onClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async (data: FormCreateTopic) => {
    setIsSubmit(true);
    setInputData(data);
  };

  return (
    <div className="">
      <ModalForm
        isOpen={showModal}
        onClose={onClose}
        handleSubmit={handleSubmit}
        isSubmit={isSubmit}
        fields={topicFields}
        formInit={topicInit}
      />
      <div className="xl:container mx-auto px-4 py-8 rounded-3xl">
        <div className="flex justify-between max-md:block glass py-4">
          <div className="flex items-center ms-4">
            <h2 className="text-3xl max-md:text-2xl font-semibold">{`Topic's dashboard`}</h2>
            <button
              onClick={() => setShowModal(true)}
              type="button"
              className="btn btn-outline btn-accent ms-2"
            >
              ➡️ Add Topic
            </button>
          </div>
          <div className="flex max-md:justify-center items-center me-4">
            <div className="input-floating w-72">
              <input
                type="text"
                placeholder="Search topic"
                className="input"
                id="floatingInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
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
