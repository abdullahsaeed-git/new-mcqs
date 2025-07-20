import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { FaPlusCircle } from "react-icons/fa";

export default function Dashboard() {

  const [db, setdb] = useState(null)
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newTestDate, setNewTestDate] = useState("");
  const [newTestName, setNewTestName] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { search } = useLocation();

  // useEffect(() => {
  //   setTimeout(() => {
  //     setTests(db.tests);
  //     setLoading(false);
  //   }, 500);
  // }, []);

  useEffect(() => {

    fetch("/assets/data/db.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Loaded DB data:", data);
        setdb(data);
      })
      .catch((error) => console.error("Error loading db.json:", error));
  }, [search]);

  useEffect(() => {
    if (!db) return;

    setTests(db.tests)
    setLoading(false);
  }, [db]);

  if (loading) return <Loading />;

  return (
    <div className="container-fluid py-5" style={{ maxWidth: "1400px" }}>
      <div className="mb-4 text-center">
        <h2
          className="fw-bold mb-2"
          style={{ color: "#00d8ff", letterSpacing: "1px", fontSize: "2.5rem" }}
        >
          Dashboard
        </h2>
        <p className="text-secondary mb-0 fs-5">
          Overview of all MCQ tests and their top performers.
        </p>
      </div>
      <div
        className="table-responsive rounded-4  p-4 mx-auto bg-none"
        style={{ background: "none !important", maxWidth: "1200px" }}
      >
        <table
          className="table table-dark table-hover align-middle mb-0 border-0"
          style={{
            borderRadius: "1.5rem",
            overflow: "hidden",
            // boxShadow:
            //   "0 4px 32px 0 rgba(0,216,255,0.10), 0 1.5px 16px 0 rgba(0,255,163,0.10), 0 0.5px 2px 0 #000",
            borderWidth: "1.5px",
            borderColor: 'red',
            borderStyle: "solid",
          }}
        >
          <thead style={{ background: "#181a1b" }}>
            <tr style={{ borderBottom: "2px solid #00d8ff" }}>
              <th
                className="text-info p-3 fs-5"
                style={{
                  background: "rgba(0,216,255,0.05)",
                  borderTopLeftRadius: "1rem",
                
                }}
              >
                Date
              </th>
              <th
                className="text-info py-3 fs-5"
                style={{ background: "rgba(0,216,255,0.05)" }}
              >
                Top Scorer
              </th>
              <th
                className="text-info py-3 fs-5"
                style={{ background: "rgba(0,216,255,0.05)" }}
              >
                Top Score
              </th>
              <th
                className="text-info py-3 fs-5"
                style={{
                  background: "rgba(0,216,255,0.05)",
                  borderTopRightRadius: "1rem",
                }}
              >
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {tests.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-secondary py-4">
                  No tests found.
                </td>
              </tr>
            )}
            {tests.map((test, idx) => {
              const isCompleted = test.topScore > 0;
              return (
                <tr
                  key={test.id}
                  className={idx % 2 === 0 ? "" : "table-active"}
                  bs-hover-table-bg = 'none'
                  style={{
                    borderTop: "1.5px solid #232526",
                    transition: "background 0.2s",
                    paddingTop: "1.5rem",
                    paddingBottom: "1.5rem",
                    paddingLeft: "1.5rem",
                  }}
                >
                  <td
                    className="fw-semibold py-4 fs-6"
                    style={{ color: "#00ffa3", paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
                  >
                    {test.date}
                  </td>
                  <td className="py-4 fs-5" style={{ color: "#00d8ff", paddingTop: "1.5rem", paddingBottom: "1.5rem" }}>
                    {test.topScorer}
                  </td>
                  <td className="py-4 fs-5" style={{ color: "#fff", paddingTop: "1.5rem", paddingBottom: "1.5rem" }}>
                    {test.topScore}
                  </td>
                  <td className="py-4 fs-5" style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}>
                    {isCompleted ? (
                      <button
                        className="btn btn-outline-info btn-sm px-3 shadow-sm"
                        style={{
                          borderRadius: "2rem",
                          fontWeight: 600,
                          letterSpacing: "1px",
                        }}
                        onClick={() =>
                          navigate(
                            `/test-details?testId=${encodeURIComponent(test.id)}&pass=admin123`
                          )
                        }
                      >
                        View Test
                      </button>
                    ) : (
                      <button
                        className="btn btn-success btn-sm px-3 shadow-sm"
                        style={{
                          borderRadius: "2rem",
                          fontWeight: 600,
                          letterSpacing: "1px",
                        }}
                        onClick={() => alert('Start test logic here')}
                      >
                        Start Test
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Test Button Below Table */}
      <div className="d-flex justify-content-end mt-4">
        <button
          className="btn btn-primary btn-lg d-flex align-items-center gap-2 px-4 shadow justify-content-center hover-overlay"
          style={{
            borderRadius: "2rem",
            fontWeight: 600,
            letterSpacing: "1px",
            width: "100%",
            textAlign: "center",
          }}
          onClick={() => setShowAdd(true)}
        >
          <FaPlusCircle className="fs-5" />
          Add Test
        </button>
      </div>
      {showAdd && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{background: 'rgba(0,0,0,0.7)', zIndex: 9999}}>
          <div className="bg-dark text-light p-5 rounded-4 shadow-lg" style={{minWidth: 350, maxWidth: 400}}>
            <h4 className="mb-4">Add New Test</h4>
            <form onSubmit={e => {e.preventDefault(); setShowAdd(false);}}>
              <div className="mb-3">
                <label className="form-label">Test Date</label>
                <input type="date" className="form-control" value={newTestDate} onChange={e => setNewTestDate(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Test Name</label>
                <input type="text" className="form-control" value={newTestName} onChange={e => setNewTestName(e.target.value)} required />
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import db from "../data/db.json";
// import Loading from "./Loading";
// import { FaPlusCircle } from "react-icons/fa";

// // Simple admin authentication check (replace with your real logic if needed)
// function isAdminAuthenticated() {
//   return sessionStorage.getItem("isAdmin") === "true";
// }

// export default function Dashboard() {
//   const [loading, setLoading] = useState(true);
//   const [tests, setTests] = useState([]);
//   const [showAdd, setShowAdd] = useState(false);
//   const [newTestDate, setNewTestDate] = useState("");
//   const [newTestName, setNewTestName] = useState("");
//   const [authChecked, setAuthChecked] = useState(false);
//   const navigate = useNavigate();

//   // Authentication check
//   useEffect(() => {
//     if (!isAdminAuthenticated()) {
//       navigate("/admin/login");
//     } else {
//       setAuthChecked(true);
//     }
//   }, [navigate]);

//   useEffect(() => {
//     if (!authChecked) return;
//     const fetchData = async () => {
//       await new Promise((res) => setTimeout(res, 500));
//       const enrichedTests = db.tests.map((test) => {
//         const topCandidate = test.contestants?.reduce(
//           (top, curr) => (curr.score > (top?.score || 0) ? curr : top),
//           null
//         );
//         return {
//           ...test,
//           topScore: topCandidate?.score || 0,
//           topScorer: topCandidate?.name || "No one",
//         };
//       });
//       setTests(enrichedTests);
//       setLoading(false);
//     };
//     fetchData();
//   }, [authChecked]);

//   const handleAddTest = (e) => {
//     e.preventDefault();
//     const newTest = {
//       id: `${Date.now()}`,
//       date: newTestDate,
//       name: newTestName,
//       contestants: [],
//       topScore: 0,
//       topScorer: "No one",
//     };
//     setTests((prev) => [...prev, newTest]);
//     setNewTestDate("");
//     setNewTestName("");
//     setShowAdd(false);
//   };

//   if (!authChecked) return null;
//   if (loading) return <Loading />;

//   return (
//     <div className="container-fluid py-5" style={{ maxWidth: "1400px" }}>
//       {/* ...existing dashboard code... */}
//     </div>
//   );
// }
