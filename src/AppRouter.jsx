

import App from "./App"; // Import your App component
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import AdminLogin from "./components/AdminLogin";
import ContestantLogin from "./components/ContestantLogin";
import Dashboard from "./components/Dashboard";
import TestDetails from "./components/TestDetails";
import ContestantPerformance from "./components/ContestantPerformance";
import ErrorBoundary from "./components/ErrorBoundary";
import Test from "./components/Test";
import TestSubmission from "./components/TestSubmission";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
            <Route path="/" element={<Home />} />
          <Route element={<App />}>
            <Route path="/admin/login" element={<AdminLogin  />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/test-details" element={<TestDetails />} />

            <Route path=":contestantName/test" element={<Test />} />
            <Route path=":contestantName" element={<ContestantLogin />} />
            <Route
              path=":contestantName/test-submission"
              element={<TestSubmission />}
            />
            <Route
              path=":contestantName/performance"
              element={<ContestantPerformance />}
            />
            <Route
              path="*"
              element={
                <div className="container mt-5">
                  <h2>404 - Page Not Found</h2>
                </div>
              }
            />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

