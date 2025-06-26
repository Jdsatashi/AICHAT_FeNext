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
  FormCreateUser,
  initApiQueryParams,
} from "@/types/api";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ModalFilter from "@/components/ModalFilter";
import StringQueryParam from "@/utils/StringQueryParam";
import FilterBar from "@/components/FilterBar";

const PageTopic = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] =
    useState<ApiQueryParams>(initApiQueryParams);

  const [showModal, setShowModal] = useState(false);
  const [topics, setTopics] = useState<ChatTopic[]>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [inputData, setInputData] = useState<FormCreateTopic | null>(null);
  const [errorFields, setErrorFields] = useState<Record<string, string> | null>(
    null
  );

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
      const timeout = setTimeout(() => {
        getTopics(queryParams);
      }, 500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [showModal, queryParams, showFilter, router]);

  useEffect(() => {
    if (isSubmit && inputData) {
      const submitTopic = async () => {
        const { error } = await createTopic(inputData);
        if (error) {
          setErrorFields(error as Record<string, string>);
          setIsSubmit(false);
          return;
        }
        setIsSubmit(false);
        setShowModal(false);
      };
      submitTopic();
    }
  }, [inputData, isSubmit]);

  const onClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async (data: FormCreateTopic | FormCreateUser) => {
    setIsSubmit(true);
    setInputData(data as FormCreateTopic);
  };

  return (
    <div className="">
      <ModalForm
        title="Topic"
        isOpen={showModal}
        onClose={onClose}
        handleSubmit={handleSubmit}
        isSubmit={isSubmit}
        fields={topicFields}
        formInit={topicInit}
        errorFields={errorFields}
      />
      <ModalFilter
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
      />
      <div className="xl:container mx-auto px-4 py-8 rounded-3xl">
        <FilterBar
          setQueryParams={setQueryParams}
          queryParams={queryParams}
          setShowModal={setShowModal}
          setShowFilter={setShowFilter}
          title="Topic"
        />
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
