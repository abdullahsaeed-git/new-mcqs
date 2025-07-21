import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { useState, useEffect } from "react";

export default function ContestantPerformance() {
  const [db, setdb] = useState(null);

  // useEffect(() => {
  //   fetch("/assets/data/db.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Loaded DB data:", data);
  //       setdb(data);
  //     })
  //     .catch((error) => console.error("Error loading db.json:", error));
  // }, []);

  const { contestantName } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {search} = useLocation();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [viewPostHeight, setViewPortHeight] = useState(window.innerHeight);
  const [viewPortWidth, setViewPortWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  const [sortValue, setSortValue] = useState('oldestToLatest');
  useEffect(() => {
    if (viewPortWidth < 768) {
      setIsMobile(true);
    }
  }, []);
  

  // useEffect(() => {
  //   const params = new URLSearchParams(search);
  //   const password = params.get("pass");
  //   setPassword(password);

  //     fetch("/assets/data/db.json")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log("Loaded DB data:", data);
  //         setdb(data);
  //       })
  //       .catch((error) => console.error("Error loading db.json:", error));

  //   setTimeout(() => {
  //     const found = db.users.find((u) => u.username === contestantName);
  //     setUser(found);
  //     setLoading(false);
      
  //   }, 500);
  // }, [contestantName]);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const password = params.get("pass");
    setPassword(password);

    fetch("/assets/data/db.json")
      .then((res) => res.json())
      .then((data) => {
        setdb(data);
      })
      .catch((error) => console.error("Error loading db.json:", error));
  }, [search]);

  useEffect(() => {
    if (!db) return;

    const found = db.users.find((u) => u.username === contestantName);
    setUser(found);
    setLoading(false);
  }, [db, contestantName]);

  if (loading) return <Loading />;
  if (!user || user.password !== password)
    return (
      <div className="container mt-5">
        <h3>Contestant not found.</h3>
        <button
          className="btn btn-secondary mt-3"
          onClick={() => {
            navigate(`/${contestantName}`);
          }}
        >
          {" "}
          Login Again{" "}
        </button>
      </div>
    );

    let userTestArrayReverse = sortValue === "latestToOldest" ? (user?.testHistory.slice().reverse() ) : sortValue === "oldestToLatest" ? ( user?.testHistory) : null;

  return (
    <>
      {/* <form
        action="https://api.web3forms.com/submit"
        className=""
        style={{
          maxWidth: "90vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          padding: 20,
        }}
        method="POST"
      >
        {/* <!-- REQUIRED: Your Access key here. Don't worry this can be public --> 
        <input
          type="hidden"
          name="apikey"
          value="f2f0fe10-3b35-47c5-8529-b2fd66506fad"
        />
        <input
          type="hidden"
          name="access_key"
          value="f2f0fe10-3b35-47c5-8529-b2fd66506fad"
        />
        <input
          type="hidden"
          name="redirect"
          value="https://web3forms.com/success"
        />

        <input
          type="checkbox"
          name="botcheck"
          id=""
          style={{ display: "none" }}
        />

        <input type="hidden" name="email" />
        <input type="text" name="First Name" required />
        <input type="text" name="Phone Number" required />
        <textarea name="message" cols="30" rows="10" required></textarea>

        <button type="submit">Submit Form</button>
      </form> */}

     

      {/* // <div className="container mt-5">
    //   <h2 className="mb-4">Performance: {user.username}</h2>

    //   <ul
    //     className={`list-group list-group-flush row-gap-3 ${isMobile && "row"}`}
    //     style={{ flexDirection: isMobile && "row" }}
    //   >
    //     <div
    //      className={`text-center ${isMobile ? "col-6" : " row"}`}
    //       style={{ flexDirection: isMobile ? "column" : "" }}
    //     >
    //       <div className={`col${isMobile ? "" : "-3"}`}>
    //         <li className="list-group-item  fw-bold performance-header">
    //           {isMobile ? "Mobile" : "Test"}
    //           {console.log("Height", viewPostHeight)}
    //           {console.log("Width", viewPortWidth)}
    //         </li>
    //       </div>

    //       <div className={`col${isMobile ? "" : "-3"}`}>
    //         <li className="list-group-item fw-bold performance-header">Date</li>
    //       </div>

    //       <div className={`col${isMobile ? "" : "-3"}`}>
    //         <li className="list-group-item fw-bold performance-header ">
    //           Programming Language
    //         </li>
    //       </div>
    //       <div className={`col${isMobile ? "" : "-3"}`}>
    //         <li className="list-group-item fw-bold performance-header ">
    //           Score
    //         </li>
    //       </div>
    //     </div>
    //     {user.testHistory.length === 0 && (
    //       <li className="list-group-item">No test history.</li>
    //     )}

    //     {user.testHistory.map((t, i) => (
    //       <div className={`text-center ${isMobile ? "col-6" : " row "}`}
    //         key={i}
    //         style={{ flexDirection: isMobile && "column" }}>
    //         <div className={`col${isMobile ? "" : "-3"}`}>
    //           <li className="list-group-item performance-components ">
    //             {t.testId}
    //           </li>
    //         </div>
    //         <div className={`col${isMobile ? "" : "-3"}`}>
    //           <li className="list-group-item performance-components">
    //             {t.date}
    //           </li>
    //         </div>
    //         <div className={`col${isMobile ? "" : "-3"}`}>
    //           <li className="list-group-item performance-components">
    //             {t.language}
    //           </li>
    //         </div>
    //         {t.status === "pending" ? (
    //           <div className={`col${isMobile ? "" : "-3"}`}>
    //             <li
    //               className="list-group-item alert-start-test"
    //               onClick={() => {
    //                 navigate(
    //                   `/${contestantName}/test?testId=${t.testId}&pass=${user.password}`
    //                 );
    //               }}
    //             >
    //               Start Test
    //             </li>
    //           </div>
    //         ) : (
    //           <div className={`col${isMobile ? "" : "-3"}`}>
    //             <li className={"list-group-item"}>{t.score}</li>
    //           </div>
    //         )}
    //       </div>
    //     ))}
    //   </ul>
    // </div> */}

      <div className="container mt-5">
        <h2 className="mb-4 text-white">Performance: {user.username}</h2>
        {isMobile && (
          <div
            className="performance-sort d-flex justify-content-center align-items-start"
            style={{ flexDirection: "column" }}
          >
            <label
              htmlFor="sort-performance-tests"
              style={{
                marginRight: "3rem",
                fontSize: "0.75rem",
                margin: "2px",
                marginBottom: "5px",
              }}
            >
              Sort By
            </label>
            <select
              name="sort-tests"
              id="sort-performance-tests"
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
              style={{
                padding: "4px 8px",
                margin: "5px 0",
                width: "fit-content",
                border: "1px solid #ccc",
                borderRadius: "6px",
                backgroundColor: "#fff",
                fontSize: "0.875rem",
                color: "#333",
                // appearance: "none",
                // WebkitAppearance: "none",
                // MozAppearance: "none",
                cursor: "pointer",
              }}
            >
              <option value="latestToOldest">Latest to Oldest</option>
              <option value="oldestToLatest">Oldest to Latest</option>
            </select>
          </div>
        )}

        {userTestArrayReverse.length === 0 ? (
          <li className="list-group-item">No test history.</li>
        ) : isMobile ? (
          // MOBILE VIEW
          <div className="row">
            {userTestArrayReverse.map((t, i) => (
              <div key={i} className="col-12 mb-3">
                <div className="card bg-dark text-white p-3">
                  <div className="row mb-2">
                    <div className="col-6 fw-bold">Test</div>
                    <div className="col-6">{t.testId}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6 fw-bold">Date</div>
                    <div className="col-6">{t.date}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6 fw-bold">Language</div>
                    <div className="col-6">{t.language}</div>
                  </div>
                  <div className="row">
                    <div className="col-6 fw-bold">Score</div>
                    <div className="col-6">
                      {t.status === "pending" ? (
                        <button
                          className="btn btn-info alert-start-test btn-sm "
                          onClick={() => {
                            navigate(
                              `/${contestantName}/test?testId=${t.testId}&pass=${user.password}`
                            );
                          }}
                        >
                          Start Test
                        </button>
                      ) : (
                        t.score
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // DESKTOP VIEW
          <table className="table table-dark table-bordered text-center">
            <thead>
              <tr className="fw-bold">
                <th className="performance-header">Test</th>
                <th className="performance-header">Date</th>
                <th className="performance-header">Programming Language</th>
                <th className="performance-header">Score</th>
              </tr>
            </thead>
            <tbody>
              {user.testHistory.map((t, i) => (
                <tr key={i} className="">
                  <td>{t.testId}</td>
                  <td>{t.date}</td>
                  <td>{t.language}</td>
                  <td>
                    {t.status === "pending" ? (
                      <button
                        className="btn btn-info  alert-start-test"
                        onClick={() => {
                          navigate(
                            `/${contestantName}/test?testId=${t.testId}&pass=${user.password}`
                          );
                        }}
                        style={{ width: "100%" }}
                      >
                        Start Test
                      </button>
                    ) : (
                      t.score
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
