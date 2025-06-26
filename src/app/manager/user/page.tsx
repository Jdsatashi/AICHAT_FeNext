"use client";

import { createUser, getAllUsers } from "@/actions/api/user";
import FilterBar from "@/components/FilterBar";
import ModalFilter from "@/components/ModalFilter";
import ModalForm from "@/components/ModalForm";
import {
  initUserCreateFields,
  userCreateFields,
} from "@/constants/data/userFields";
import {
  ApiQueryParams,
  FormCreateTopic,
  FormCreateUser,
  initApiQueryParams,
  User,
} from "@/types/api";
import React, { useEffect, useState } from "react";

export default function UserPage() {
  const [userList, setUserList] = useState<User[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [inputData, setInputData] = useState<FormCreateUser | null>(null);
  const [errorFields, setErrorFields] = useState<Record<string, string> | null>(
    null
  );

  const [queryParams, setQueryParams] =
    useState<ApiQueryParams>(initApiQueryParams);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await getAllUsers(queryParams);
      if (error) {
        console.log(error);
        alert(error);
      }
      setUserList(data.data);
      console.table(data.data);
    };
    const timeout = setTimeout(() => {
      fetchUser();
    }, 500);
    return () => clearTimeout(timeout);
  }, [queryParams]);

  useEffect(() => {
    if (isSubmit && inputData) {
      const submitUser = async () => {
        const { error } = await createUser(inputData);
        if (error) {
          setErrorFields(error as Record<string, string>);
          setIsSubmit(false);
          return;
        }
        setIsSubmit(false);
        setShowModal(false);
      };
      submitUser();
    }
  }, [inputData, isSubmit]);

  const onClose = () => {
    setShowModal(false);
  };

  const handleSubmit = (data: FormCreateTopic | FormCreateUser) => {
    setIsSubmit(true);
    setInputData(data as FormCreateUser);
  };

  return (
    <>
      <ModalForm
        title="User"
        isOpen={showModal}
        onClose={onClose}
        handleSubmit={handleSubmit}
        isSubmit={isSubmit}
        fields={userCreateFields}
        formInit={initUserCreateFields}
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
          title="User"
        />
        <div className="bg-white rounded-lg shadow-2xl mt-4">
          <div className="w-full overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.is_active ? (
                        <div className="p-0 btn btn-gradient btn-success btn-sm rounded-full">
                          <span className="icon-[tabler--check] size-5 btn btn-success" />
                        </div>
                      ) : (
                        <div className="p-0 btn btn-gradient btn-error btn-sm rounded-full">
                          <span className="icon-[tabler--x] size-5 btn btn-success" />
                        </div>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-circle btn-text btn-sm"
                        aria-label="Action button"
                      >
                        <span className="icon-[tabler--pencil] size-5"></span>
                      </button>
                      <button
                        className="btn btn-circle btn-text btn-sm"
                        aria-label="Action button"
                      >
                        <span className="icon-[tabler--trash] size-5"></span>
                      </button>
                      <button
                        className="btn btn-circle btn-text btn-sm"
                        aria-label="Action button"
                      >
                        <span className="icon-[tabler--dots-vertical] size-5"></span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
