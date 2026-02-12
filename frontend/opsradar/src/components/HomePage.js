import React from "react";
import { useLoaderData } from "react-router-dom";

const HomePage = () => {
  const {
    latestIncidents: recentIncidents,
    stats,
    systemHealth,
  } = useLoaderData();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8 space-y-6 p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border bg-white p-4 shadow-sm"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-gray-800">
            Recent Incidents
          </h2>
          <ul className="space-y-2">
            {recentIncidents.map((inc) => (
              <li
                key={inc.id}
                className="flex justify-between rounded-md bg-gray-50 px-3 py-2"
              >
                <span>{inc.title}</span>
                <span className="text-sm font-semibold text-red-600">
                  {inc.severity}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-gray-800">
            System Health
          </h2>
          <ul className="space-y-2">
            {Object.entries(systemHealth).map(([component, status]) => (
              <li
                key={component}
                className="flex justify-between rounded-md bg-gray-50 px-3 py-2"
              >
                <span>{component}</span>
                <span
                  className={`text-sm font-semibold ${
                    status === "Healthy" ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

export async function loader() {
  const res = await fetch("http://localhost:5000/incidents");
  const incidents = await res.json();

  const totalIncidents = incidents.length;
  let openIncidents = 0,
    highSeverityIncidents = 0,
    resolvedIncidents = 0;

  const systemIncidents = { Frontend: 0, Backend: 0, Database: 0 };
  const systemIncLimit = 2;

  incidents.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  const latestIncidents = incidents
    .map((inc) => ({
      id: inc.id,
      title: inc.title,
      severity: inc.severity,
    }))
    .slice(0, incidents.length >= 3 ? 3 : incidents.length);

  incidents.forEach((inc) => {
    if (inc.status === "Open") {
      openIncidents++;
    }
    if (inc.severity === ("P1" || "P2")) {
      highSeverityIncidents++;
    }
    if (inc.status === "Resolved") {
      resolvedIncidents++;
    }
    if (inc.status !== "Resolved" && inc.status !== "Closed") {
      if (inc.category === "Application" && inc.service === "frontend-ui") {
        systemIncidents["Frontend"] += 1;
      } else if (inc.category === "Database") {
        systemIncidents["Database"] += 1;
      } else if (
        inc.category === "Application" &&
        inc.service !== "frontend-ui" &&
        inc.service !== "monitoring-stack"
      ) {
        systemIncidents["Backend"] += 1;
      }
    }
  });

  const systemHealth = Object.fromEntries(
    Object.entries(systemIncidents).map(([key, value]) => [
      key,
      value >= systemIncLimit ? "Degraded" : "Healthy",
    ]),
  );
  console.log(systemIncidents);

  const stats = [
    { label: "Total Incidents", value: totalIncidents },
    { label: "Open Incidents", value: openIncidents },
    { label: "High Severity (P1/P2)", value: highSeverityIncidents },
    { label: "Resolved (24h)", value: resolvedIncidents },
  ];

  return {
    latestIncidents,
    systemHealth,
    stats,
  };
}
