"use client";

import { createTopic, getChatTopics } from "@/actions/api/chatTopic";
import { TopicCard } from "@/components/TopicCard";
import ModalForm from "@/components/ModalForm";
import { topicFields, topicInit } from "@/constants/data/topicFields";
import {
  ApiQueryParamKeys,
  ApiQueryParams,
  ChatTopic,
  FormCreateTopic,
  initApiQueryParams,
} from "@/types/api";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ModalFilter from "@/components/ModalFilter";
import StringQueryParam from "@/utils/StringQueryParam";

const PageTopic = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] =
    useState<ApiQueryParams>(initApiQueryParams);

  const [showModal, setShowModal] = useState(false);
  const [topics, setTopics] = useState<ChatTopic[]>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [inputData, setInputData] = useState<FormCreateTopic | null>(null);

  const [showFilter, setShowFilter] = useState<boolean>(false);

  useEffect(() => {
    const queries: { [x: string]: string } = {};

    for (const value of ApiQueryParamKeys) {
      const queryValue = searchParams.get(value);
      if (queryValue !== null) {
        queries[value] = queryValue;
      }
    }
    console.log(queries);
    setQueryParams(queries);
  }, [searchParams]);

  useEffect(() => {
    if (!showModal && !showFilter) {
      const getTopics = async (queries: ApiQueryParams) => {
        const { data, error } = await getChatTopics(queries);
        if (error) {
          console.log(error);
          return;
        }
        setTopics(data.data);
      };
      const queryString = StringQueryParam(queryParams);
      router.push(window.location.pathname + queryString);

      getTopics(queryParams);
    }
  }, [showModal, queryParams, showFilter, router]);

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
      <ModalFilter
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
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
            <label
              onClick={() => setShowFilter(true)}
              className="btn btn-circle swap swap-rotate"
            >
              <input type="checkbox" />
              <span className="icon-[tabler--menu-2] swap-off"></span>
              <span className="icon-[tabler--x] swap-on"></span>
            </label>
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
        <div className="mt-4 p-4 glass rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[72vh] overflow-y-scroll">
            {topics.map((topic: ChatTopic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTopic;
