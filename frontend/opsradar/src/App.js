import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateIncident, {
  action as incidentActions,
  loader as fieldOptionsLoader,
} from "./components/CreateIncident";
import Incidents, { loader as incidentsLoader } from "./components/Incidents";
import ErrorPage from "./layout/ErrorPage";
import RootLayout from "./layout/RootLayout";
import HomePage, { loader as dashboardLoader } from "./components/HomePage";
import IncidentView, {
  loader as incidentDetailLoader,
  action as updateIncidentActions,
} from "./components/IncidentView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage />, loader: dashboardLoader },
      {
        path: "incidents",
        children: [
          { index: true, element: <Incidents />, loader: incidentsLoader },
          {
            path: ":incidentId",
            id: "incident-detail",
            element: <IncidentView />,
            loader: incidentDetailLoader,
            action: updateIncidentActions,
          },
        ],
      },
      {
        path: "/create-incident",
        action: incidentActions,
        loader: fieldOptionsLoader,
        element: <CreateIncident />,
      },
      {
        path: "*",
        element: (
          <ErrorPage
            status={404}
            message="Not Found"
            description="Sorry, we couldn’t find the page you’re looking for."
          />
        ),
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
