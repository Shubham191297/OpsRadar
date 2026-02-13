import React from "react";
import { useActionData, Form, redirect, useLoaderData } from "react-router-dom";
import Input from "../layout/Input";
import SelectFilter from "../layout/SelectFilter";
import { serverURL } from "../utils/serverURL";

const CreateIncident = () => {
  const errors = useActionData();
  const fieldOptions = useLoaderData();

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an Incident
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {errors && (
            <p className="text-sm text-red-600 mb-4">{errors.message}</p>
          )}
          <Form className="space-y-6" method="POST" noValidate>
            <Input fieldName="Title" inputName="title" errors={errors} />
            <div className="text-left">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 ${
                    errors?.inputName === "description"
                      ? "bg-red-200 ring-red-600"
                      : "ring-gray-300"
                  } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                ></textarea>
              </div>
            </div>
            <SelectFilter
              fieldName="Severity"
              inputName="severity"
              inputOptions={fieldOptions.severity}
              errors={errors}
            />
            <SelectFilter
              fieldName="Created By"
              inputName="creator"
              inputOptions={fieldOptions.users}
              errors={errors}
            />
            <SelectFilter
              fieldName="Category"
              inputName="category"
              inputOptions={fieldOptions.category}
              errors={errors}
            />
            <SelectFilter
              fieldName="Status"
              inputName="status"
              inputOptions={fieldOptions.status}
              errors={errors}
            />
            <Input fieldName="Tags" inputName="tags" errors={errors} />
            <SelectFilter
              fieldName="Assigned To"
              inputName="assignee"
              inputOptions={fieldOptions.users}
              errors={errors}
            />
            <SelectFilter
              fieldName="Service Impacted"
              inputName="service"
              inputOptions={fieldOptions.service}
              errors={errors}
            />
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-teal"
              >
                Create
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateIncident;

export async function action({ request }) {
  const formData = await request.formData();

  const title = formData.get("title");
  const description = formData.get("description");
  const status = formData.get("status");
  const category = formData.get("category");
  const assignee = formData.get("assignee");
  const creator = formData.get("creator");
  const service = formData.get("service");
  const tags = formData.get("tags");
  const severity = formData.get("severity");

  const res = await fetch(`${serverURL}/create-incident`, {
    method: request.method,
    body: JSON.stringify({
      title,
      description,
      creator,
      assignee,
      severity,
      service,
      category,
      tags,
      status,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return redirect("/incidents");
}

export async function loader() {
  const res = await fetch(`${serverURL}/metadata`);
  const fieldData = await res.json();
  return fieldData;
}
