// // import { useParams, useLocation } from "react-router-dom";
// // import db from "../data/db.json";
// // import Loading from "./Loading";
// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Test from "./Test";

// // export default function TestDetails() {
// //   const { search } = useLocation();
// //   const navigate = useNavigate();
// //   const [test, setTest] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [adminPass, setAdminPass] = useState("");
// //   const [users, setUsers] = useState(null);

// //   useEffect(() => {
// //     const params = new URLSearchParams(search);
// //     const testId = params.get("testId");
// //     const pass = params.get("pass");
// //     setAdminPass(pass);

// //     setTimeout(() => {
// //       const foundTest = db.tests.find((t) => t.id === testId);
// //       setTest(foundTest);
// //       console.log(foundTest, "is found test");
// //       // const users = db.users.find((u) =>  {foundTest.contestants.find((c) => c.name === u.username)})
// //       const users = db.users.filter((u) =>
// //         foundTest.contestants.some((c) => c.name === u.username)
// //       );
// //       setUsers(users);
// //       console.log(users);

// //       setLoading(false);
// //     }, 500);
// //   }, [search]);

// //   const handleViewTest = (c) => {
// //     const user = db.users.find((u) => u.username === c.name);
// //     navigate(`/${c.name}/test?testId=${test.id}&pass=${user.password}`);
// //   };

// //   if (loading) return <Loading />;

// //   return (
// //     <>
// //       {/************* Test Results ***********************/}

// //       <div
// //         className="container-fluid py-5 d-flex flex-column align-items-center justify-content-center  text-light"
// //         style={{
// //           backgroundColor: "none",
// //         }}
// //       >
// //         <div
// //           className="rounded-4 shadow-lg p-5 w-100"
// //           style={{ maxWidth: 700, background: "rgba(30,34,40,0.92)" }}
// //         >
// //           <h2
// //             className="fw-bold mb-4 text-info"
// //             style={{ letterSpacing: "1px" }}
// //           >
// //             Test Results
// //             <span className="text-secondary">({test.date})</span>
// //           </h2>
// //           <table
// //             className="table table-dark table-borderless"
// //             style={{
// //               borderRadius: 12,
// //               overflow: "hidden",
// //               background: "#23272a",
// //               marginBottom: 0,
// //             }}
// //           >
// //             <thead>
// //               <tr
// //                 style={{
// //                   background: "#23272a",
// //                   color: "#6cf",
// //                   fontWeight: 600,
// //                   fontSize: 16,
// //                 }}
// //               >
// //                 <th style={{ border: 0, padding: "14px 18px" }}>Name</th>
// //                 <th style={{ border: 0, padding: "14px 18px" }}>Score</th>
// //                 <th style={{ border: 0, padding: "14px 18px" }}>Rank</th>
// //                 {adminPass === "admin123" && (
// //                   <th style={{ border: 0, padding: "14px 18px" }}>Test</th>
// //                 )}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {users.map((u, i) => (
// //                 <>
// //                   {u.testHistory.find((t) => t.testId === test.id).status ===
// //                     "submitted" && (
// //                     <tr
// //                       key={i}
// //                       style={{
// //                         background: i % 2 === 0 ? "#23272a" : "#181a1b",
// //                       }}
// //                     >
// //                       <td
// //                         style={{
// //                           border: 0,
// //                           padding: "12px 18px",
// //                           color: "#f1f1f1",
// //                         }}
// //                       >
// //                         {u.username}
// //                       </td>
// //                       <td
// //                         style={{
// //                           border: 0,
// //                           padding: "12px 18px",
// //                           color: "#6cf",
// //                           fontWeight: 500,
// //                         }}
// //                       >
// //                         {u.testHistory.find((t) => t.testId === test.id).score}
// //                       </td>
// //                       <td
// //                         style={{
// //                           border: 0,
// //                           padding: "12px 18px",
// //                           color:
// //                             u.testHistory.find((t) => t.testId === test.id)
// //                               .rank === 1
// //                               ? "#ffd700"
// //                               : u.testHistory.find((t) => t.testId === test.id)
// //                                   .rank === 2
// //                               ? "#c0c0c0"
// //                               : u.testHistory.find((t) => t.testId === test.id)
// //                                   .rank === 3
// //                               ? "#cd7f32"
// //                               : "#aaa",
// //                           fontWeight: 600,
// //                         }}
// //                       >
// //                         {u.testHistory.find((t) => t.testId === test.id).rank}
// //                       </td>
// //                       <td
// //                         style={{
// //                           border: 0,
// //                           padding: "12px 18px",
// //                           fontWeight: 600,
// //                           cursor: "pointer",
// //                         }}
// //                       >
// //                         {adminPass === "admin123" && (
// //                           <div
// //                             className="btn btn-outline-info btn-sm px-3 shadow-sm"
// //                             onClick={() => handleViewTest(c)}
// //                           >
// //                             View
// //                           </div>
// //                         )}
// //                       </td>
// //                     </tr>
// //                   )}
// //                 </>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }






// import { useParams, useLocation } from "react-router-dom";
// import db from "../data/db.json";
// import Loading from "./Loading";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Test from "./Test";

// export default function TestDetails() {
//   const { search } = useLocation();
//   const navigate = useNavigate();
//   const [test, setTest] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [adminPass, setAdminPass] = useState("");
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const params = new URLSearchParams(search);
//     const testId = params.get("testId");
//     const pass = params.get("pass");
//     setAdminPass(pass);

//     setTimeout(() => {
//       // const foundTest = db.tests.find((t) => t.id === testId);
//       // setTest(foundTest);

//       // const matchedUsers = db.users.filter((u) =>
//       //   foundTest?.contestants.some((c) => c.name === u.username)
//       // );
//       // setUsers(matchedUsers);
//       // console.log("Matched users", matchedUsers)

//       // Assuming foundTest and db.users are already available
//       const foundTest = db.tests.find((t) => t.id === testId);
//       setTest(foundTest);

//       if (!foundTest) return;

//       // Filter users who are in the contestants list of the test
//       const matchedUsers = db.users.filter((user) =>
//         foundTest.contestants.some(
//           (contestant) => contestant.name === user.username
//         )
//       );

//       // Sort matched users by their rank in the specific test
//       const sortedUsers = matchedUsers.sort((a, b) => {
//         const testA = a.testHistory.find((t) => t.testId === testId);
//         const testB = b.testHistory.find((t) => t.testId === testId);

//         return testA.rank - testB.rank; // Ascending order (1st rank on top)
//       });

//       setUsers(sortedUsers);
//       console.log("Sorted users by rank", sortedUsers);

//       setLoading(false);
//     }, 500);
//   }, [search]);

//   const handleViewTest = (c) => {
//     const user = db.users.find((u) => u.username === c.name);
//     navigate(`/${c.name}/test?testId=${test.id}&pass=${user.password}`);
//   };

//   if (loading) return <Loading />;

//   return (
//     <div className="container py-5 px-3">
//       <div
//         className="mx-auto p-4 p-md-5 shadow-lg rounded-4"
//         style={{
//           maxWidth: 900,
//           background: "rgba(30,34,40,0.92)",
//           color: "#f1f1f1",
//         }}
//       >
//         <h2 className="fw-bold mb-4 text-info text-center">
//           Test Results <span className="text-secondary">({test.date})</span>
//         </h2>

//         <div className="table-responsive">
//           <table className="table table-dark table-hover rounded-3 overflow-hidden">
//             <thead className="table-light text-dark">
//               <tr>
//                 <th>Name</th>
//                 <th>Score</th>
//                 <th>Rank</th>
//                 {adminPass === "admin123" && <th>Test</th>}
//               </tr>
//             </thead>
//             <tbody>
//               {/* {console.log(users.testHistory.find((t) => t.testId=== test?.id))} */}
//               {console.log(users)}

//               {users.map((u, i) => {
//                 const t = u.testHistory.find((t) => t.testId === test.id);
//                 if (!t || t.status !== "submitted") return null;

//                 const rankColor =
//                   t.rank === 1
//                     ? "#ffd700"
//                     : t.rank === 2
//                     ? "#c0c0c0"
//                     : t.rank === 3
//                     ? "#cd7f32"
//                     : "#aaa";

//                 return (
//                   <tr key={i}>
//                     <td>{u.username}</td>
//                     <td className="text-info fw-semibold">{t.score}</td>
//                     <td style={{ color: rankColor, fontWeight: 600 }}>
//                       {t.rank}
//                     </td>
//                     {adminPass === "admin123" && (
//                       <td>
//                         <button
//                           className="btn btn-outline-info btn-sm shadow-sm"
//                           onClick={() => handleViewTest({ name: u.username })}
//                         >
//                           View
//                         </button>
//                       </td>
//                     )}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


// Updated TestDetails.jsx with auto-rank calculation based on score
import { useLocation, useNavigate } from "react-router-dom";

import Loading from "./Loading";
import { useState, useEffect } from "react";

export default function TestDetails() {
  const[db, setdb] = useState(null)
  const { search } = useLocation();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminPass, setAdminPass] = useState("");
  const [users, setUsers] = useState([]);


  
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

     const params = new URLSearchParams(search);
     const testId = params.get("testId");
     const pass = params.get("pass");
     setAdminPass(pass);

       const foundTest = db.tests.find((t) => t.id === testId);
       setTest(foundTest);

       if (!foundTest) return;

       const matchedUsers = db.users.filter((user) =>
         foundTest.contestants.some((c) => c.name === user.username)
       );

       // Filter submitted tests and sort by score
       const submittedUsers = matchedUsers
         .map((user) => {
           const testRecord = user.testHistory.find((t) => t.testId === testId);
           return testRecord && testRecord.status === "submitted"
             ? { ...user, testRecord }
             : null;
         })
         .filter(Boolean)
         .sort((a, b) => b.testRecord.score - a.testRecord.score);

       // Assign ranks based on sorted scores
       let currentRank = 1;
       let previousScore = null;
       let actualRank = 1;

       for (let i = 0; i < submittedUsers.length; i++) {
         const user = submittedUsers[i];
         const score = user.testRecord.score;

         if (score !== previousScore) {
           actualRank = currentRank;
         }

         // Update user's testHistory with new rank
         const testIndex = user.testHistory.findIndex(
           (t) => t.testId === testId
         );
         user.testHistory[testIndex].rank = actualRank;

         previousScore = score;
         currentRank++;
       }

       setUsers(submittedUsers);
       setLoading(false);
  }, [db]);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const testId = params.get("testId");
    const pass = params.get("pass");
    setAdminPass(pass);

    setTimeout(() => {
    
    }, 500);
  }, [search]);

  const handleViewTest = (c) => {
    const user = db.users.find((u) => u.username === c.name);
    navigate(`/${c.name}/test?testId=${test.id}&pass=${user.password}`);
  };

  if (loading) return <Loading />;

  return (
    <div className="container py-5 px-3">
      <div
        className="mx-auto p-4 p-md-5 shadow-lg rounded-4"
        style={{
          maxWidth: 900,
          background: "rgba(30,34,40,0.92)",
          color: "#f1f1f1",
        }}
      >
        <h2 className="fw-bold mb-4 text-info text-center">
          Test Results <span className="text-secondary">({test.date})</span>
        </h2>

        <div className="table-responsive">
          <table className="table table-dark table-hover rounded-3 overflow-hidden">
            <thead className="table-light text-dark">
              <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Rank</th>
                {adminPass === "admin123" && <th>Test</th>}
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => {
                const t = u.testHistory.find((t) => t.testId === test.id);

                const rankColor =
                  t.rank === 1
                    ? "#ffd700"
                    : t.rank === 2
                    ? "#c0c0c0"
                    : t.rank === 3
                    ? "#cd7f32"
                    : "#aaa";

                return (
                  <tr key={i}>
                    <td>{u.username}</td>
                    <td className="text-info fw-semibold">{t.score}</td>
                    <td style={{ color: rankColor, fontWeight: 600 }}>{t.rank}</td>
                    {adminPass === "admin123" && (
                      <td>
                        <button
                          className="btn btn-outline-info btn-sm shadow-sm"
                          onClick={() => handleViewTest({ name: u.username })}
                        >
                          View
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
