import React from "react";
import { useLoaderData, Form, redirect } from "react-router-dom";
import UpdateFilter from "../layout/UpdateFilter";
import { serverURL } from "../utils/serverURL";

const IncidentView = () => {
  const { incident: incidentData, fieldOptions } = useLoaderData();
  const {
    status: statusOptions,
    users: assigneeOptions,
    severity: severityOptions,
  } = fieldOptions;

  return (
    <div className="flex min-h-screen justify-center items-start bg-gray-100 p-6">
      <div className="bg-white rounded shadow p-6 w-1/2 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-2xl text-gray-800">
            {incidentData.title}
          </h2>
          <span
            className={`px-3 py-1 rounded-full font-semibold text-sm ${
              incidentData.severity === "P0"
                ? "bg-red-500 text-white"
                : incidentData.severity === "P1"
                  ? "bg-orange-400 text-white"
                  : incidentData.severity === "P2"
                    ? "bg-yellow-300 text-gray-800"
                    : "bg-green-200 text-gray-800"
            }`}
          >
            {incidentData.severity}
          </span>
        </div>

        <p className="text-gray-600 mb-4 text-left py-6">
          {incidentData.description}
        </p>

        <div>
          <Form
            className="grid grid-cols-1 gap-4 text-gray-700 text-md text-left flex flex-col"
            method="PUT"
            noValidate
          >
            <div className="text-sm py-2 justify-end">
              <span className="font-semibold">Created At :</span>{" "}
              {incidentData.created_at}
            </div>
            <div className="text-md py-2 justify-end">
              <select
                id="severity"
                name="severity"
                className="block w-1/3 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              >
                {severityOptions.map((option) => (
                  <option
                    key={option}
                    selected={option === incidentData.severity}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex grid-cols-2">
              <UpdateFilter
                currentValue={incidentData.status}
                fieldName="Status : "
                inputName="status"
                fieldOptions={statusOptions}
              />
              <UpdateFilter
                inputName="assignee"
                fieldOptions={assigneeOptions}
                fieldName="Assigned To :"
                currentValue={incidentData.assignee}
              />
            </div>
            <div className="flex">
              <div className="w-1/2">
                <span className="font-semibold">Created By :</span>
                {"   "}
                {incidentData.creator}
              </div>
              <div>
                <span className="font-semibold">Category :</span>
                {"   "}
                {incidentData.category}
              </div>
            </div>
            <div className="flex">
              <div className="w-1/2">
                <span className="font-semibold">Service Impacted :</span>
                {"   "}
                {incidentData.service}
              </div>
              <div className="">
                <span className="font-semibold mr-2">Tags :</span>{" "}
                <input
                  name="tags"
                  className="rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 ring-gray-300 sm:text-sm sm:leading-6"
                  type="text"
                  defaultValue={incidentData.tags}
                />
              </div>
            </div>
            <div className="text-sm py-4">
              <span className="font-semibold">Updated At :</span>
              {"  "}
              {incidentData.updated_at}
            </div>
            <div>
              <input type="hidden" name="incidentId" value={incidentData.id} />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-md rounded-md bg-sky-600 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-teal"
              >
                Update Incident
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default IncidentView;

export async function loader({ params }) {
  const incidentId = params.incidentId;
  const res = await fetch(`${serverURL}/incident/${incidentId}`);
  const incident = await res.json();

  const result = await fetch(`${serverURL}/metadata`);
  const fieldOptions = await result.json();

  return { incident, fieldOptions };
}

export async function action({ request }) {
  const formData = await request.formData();

  const status = formData.get("status");
  const assignee = formData.get("assignee");
  const tags = formData.get("tags");
  const severity = formData.get("severity");
  const incidentId = formData.get("incidentId");

  const res = await fetch(`${serverURL}/incident/${incidentId}`, {
    method: request.method,
    body: JSON.stringify({
      status,
      assignee,
      tags,
      severity,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return redirect("/incidents");
}
