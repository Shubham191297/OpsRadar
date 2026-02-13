import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { serverURL } from "../utils/serverURL";

const Incidents = () => {
  const incidents = useLoaderData();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-700">Title</th>
              <th className="px-4 py-3 font-semibold text-gray-700">
                Category
              </th>
              <th className="px-4 py-3 font-semibold text-gray-700">Service</th>
              <th className="px-4 py-3 font-semibold text-gray-700">
                Severity
              </th>
              <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 font-semibold text-gray-700">
                Created By
              </th>
              <th className="px-4 py-3 font-semibold text-gray-700">
                Assigned To
              </th>
              <th className="px-4 py-3 font-semibold text-gray-700">
                Created At
              </th>
              <th className="px-4 py-3 font-semibold text-gray-700">
                Updated At
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {incidents.map((incident) => (
              <tr key={incident.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-900">
                  <Link to={`/incidents/${incident.id}`}>{incident.title}</Link>
                </td>
                <td className="px-4 py-2 text-gray-700">{incident.category}</td>
                <td className="px-4 py-2 text-gray-700">{incident.service}</td>
                <td className="px-4 py-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      incident.severity === "P0"
                        ? "bg-red-500 text-white"
                        : incident.severity === "P1"
                          ? "bg-orange-400 text-white"
                          : incident.severity === "P2"
                            ? "bg-yellow-300 text-gray-800"
                            : "bg-green-200 text-gray-800"
                    }`}
                  >
                    {incident.severity}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-700">{incident.status}</td>
                <td className="px-4 py-2 text-gray-700">{incident.creator}</td>
                <td className="px-4 py-2 text-gray-700">{incident.assignee}</td>
                <td className="px-4 py-2 text-gray-500">
                  {incident.created_at}
                </td>
                <td className="px-4 py-2 text-gray-500">
                  {incident.updated_at}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Incidents;

export async function loader() {
  const result = await fetch(`${serverURL}/incidents`);

  const incidents = await result.json();

  return incidents;
}
