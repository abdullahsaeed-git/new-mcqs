import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import TestSubmission from "./TestSubmission";

function Test() {
  const [db, setdb] = useState(null);
  const { contestantName } = useParams();
  const { search, hash } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();
  const [contestant, setContestant] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mcqs, setMcqs] = useState([]);
  const [user, setUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittingTest, setSubmittingTest] = useState(false);
  const TotalTime = 5; //Minutes
  const [timeLeft, setTimeLeft] = useState(TotalTime * 60);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentmcq, setCurrentmcq] = useState(0);
  const [showTimeAlert, setShowTimeAlert] = useState(false);
  const [selectionString, setSelectionString] = useState("");
  const submitButtonRef = useRef();
  const closeSubmitModal = useRef();
  const submitConfirmedRef = useRef();
    // const [mcqsAnswers, setMcqsAnswers] = useState([]);

  // Track selected option for the current MCQ

  // useEffect(() => {
  //   const params = new URLSearchParams(search);
  //   const testId = params.get("testId");
  //   const Password = params.get("pass");
  //   setTimeout(() => {

  //   }, 500);

  // }, [search]);

  useEffect(() => {
    fetch("/assets/data/db.json")
      .then((res) => res.json())
      .then((data) => {
        setdb(data);
      })
      .catch((error) => console.error("Error loading db.json:", error));
  }, [search]);

  useEffect(() => {
    if (!db) return;

    const params = new URLSearchParams(search);
    const testId = params.get("testId");
    const Password = params.get("pass");
    const found = db.users.find((u) => u.username === contestantName);

    setUser(found);
    const singleTest = db.tests.find((t) => t.id === testId);
    setTest(singleTest);

    // console.log(testId, singleTest)
    const singleContestant = singleTest?.contestants.find(
      (c) => c.name === contestantName
    );
    setContestant(singleContestant);
    // console.log(mcqs)
    setMcqs(singleContestant.mcqs);
    const user = db.users.find((u) => u.username === contestantName);
    setUser(user);
    if (user && user.password === Password) {
      setAuthorized(true);
    }

    setLoading(false);
  }, [db, contestantName]);

  const userTestHistory = user?.testHistory.find((t) => t.testId === test.id);
  // console.log(userTestHistory)

  useEffect(() => {
    setSelectedOptions(Array(mcqs.length).fill(null));
  }, [mcqs]);

  let [correctAnswers, setCorrectAnswers] = useState(0);
  const [answered, setAnswered] = useState({});

  const handleOptionSelect = (option, index) => {
    const updated = [...selectedOptions];
    updated[currentmcq] = option;
    setSelectedOptions(updated);

    // Prevent multiple answers for the same question
    if (answered[currentmcq]) return;
    // console.log(answered)

    // Mark the question as answered

    if (mcqs[currentmcq].answer === option) {
      // setCorrectAnswers(correctAnswers + 1);
      setAnswered((prev) => ({ ...prev, [currentmcq]: true }));
    }
  };

  useEffect(() => {
    if (userTestHistory?.status === "submitted") return;
    if (timeLeft <= 0) {
      // handleSumbitTest();
      submitConfirmedRef.current.click();
      return;
    }
    if (timeLeft <= 15) {
      setShowTimeAlert(true);
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    if (userTestHistory?.status === "submitted") return;
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${String(min).padStart(2, 0)}:${String(sec).padStart(2, 0)}`;
  };

  let mcqsAnswers = [];
  // console.log("fkdf ", contestant)
  userTestHistory?.status === "submitted"
    ? (mcqsAnswers = userTestHistory?.selectedAnswers)
    : (mcqsAnswers = selectedOptions);
  // console.log(contestant)

  const handleSumbitTest = () => {
    // console.log("submit test called")

     setSubmittingTest(true);
     setTimeout(() => {
       setSubmittingTest(false);
       closeSubmitModal.current.click();
     }, 1500);

    let correctCount = 0;
    // console.log(selectedOptions)
    for (let i = 0; i < mcqs.length; i++) {
      if (mcqs[i].answer === selectedOptions[i]) {
        correctCount++;
      } else {
      }
    }
    // console.log(correctCount);
    setCorrectAnswers(correctCount);
    setSelectionString(JSON.stringify(selectedOptions));
  };

  // useEffect(() => {
  //   submitButtonRef.current.click();
  // }, [selectionString, correctAnswers]);

  // useEffect(() => {
  //   if (submitted) {
  //     // console.log("Submitted is true. Starting timeout...");

  //     const timeoutId = setTimeout(() => {
  //       setSubmittingTest(false);
  //     }, 2000);

  //     return () => clearTimeout(timeoutId); // cleanup if submitted changes again quickly
  //   }
  // }, [submitted]);
  // console.log("Contestant:", contestant);

  if (loading) return <Loading />;

  if (!authorized) {
    return (
      <div className="container mt-5">
        <h2>Access Denied</h2>
        <button
          className="btn btn-secondary btn-lg mt-4"
          onClick={() => {
            navigate(`/${contestantName}`);
          }}
        >
          Login Again
        </button>
      </div>
    );
  }

  // if (submitted) {
  //   return (
  //     <>
  //       <TestSubmission
  //         correctAnswers={correctAnswers}
  //       />

  //     </>
  //   );
  // }

  return (
    // <>
    //   <div
    //     className="container-fluid my-4 d-flex flex-column align-items-center justify-content-center  text-light"
    //     style={{
    //       backgroundColor: "none",
    //       //   "radial-gradient(ellipse at top left, #232526 60%, #0f2027 100%) ",
    //       width: "100%",
    //     }}
    //   >
    //     <h2 className="fw-bold mb-4 text-info" style={{ letterSpacing: "1px" }}>
    //       {userTestHistory.language} MCQs{" "}
    //       <span className="text-secondary">({test.date})</span>
    //     </h2>

    //     <table
    //       className="table table-dark "
    //       style={{
    //         borderRadius: 12,
    //         overflow: "hidden",
    //         background: "#23272a",
    //         marginBottom: 0,
    //         overflowX: "scroll",
    //         position: "relative",
    //       }}
    //     >
    //       <thead>
    //         <tr
    //           style={{
    //             background: "#23272a",
    //             color: "#6cf",
    //             fontWeight: 600,
    //             fontSize: 16,
    //             textAlign: "left",
    //           }}
    //         >
    //           <th style={{ border: 0, padding: "30px 23px" }}>
    //             {" "}
    //             <span className="mx-4">{currentmcq + 1}</span>{" "}
    //             {mcqs[currentmcq]?.question}
    //           </th>
    //         </tr>
    //       </thead>

    //       <div
    //         className="rounded-4 shadow-lg p-5 w-100"
    //         style={{
    //           background: "rgba(30,34,40,0.92)",
    //           width: "100%",
    //         }}
    //       >
    //         <tbody className="w-100">
    //           {mcqs[currentmcq]?.options.map((option, index) => (
    //             <>
    //        {/* { console.log(mcqsAnswers[currentmcq], option)} */}
    //             <tr
    //               key={index}
    //               style={{ background: "none" }}
    //               className={`${
    //                 mcqsAnswers[currentmcq] === option
    //                   ? "mcq-option selected  "
    //                   : "mcq-option "
    //               } ${
    //                 contestant?.status === "submitted"
    //                   ? "element-disabled"
    //                   : " "
    //               }`}
    //               onClick={() => handleOptionSelect(option, index)}
    //             >
    //               <td
    //                 style={{
    //                   border: 0,
    //                   padding: "20px 30px",
    //                   color: "#f1f1f1",
    //                 }}
    //               >
    //                 {index === 0
    //                   ? "A"
    //                   : index === 1
    //                   ? "B"
    //                   : index === 2
    //                   ? "C"
    //                   : "D"}
    //               </td>
    //               <td
    //                 style={{
    //                   border: 0,
    //                   padding: "12px 18px",
    //                   color:
    //                     mcqsAnswers[currentmcq] === option ? "#6cf" : "#f1f1f1",
    //                     fontWeight: 500,
    //                   }}
    //               >
    //                 {option}
    //               </td>
    //             </tr>
    //                   </>
    //           ))}
    //         </tbody>

    //         <div className="btn-container mt-4 d-flex align-items-center justify-content-center gap-5">
    //           <div
    //             className="btn btn-outline-info px-4 py-2"
    //             onClick={() => {
    //               if (currentmcq > 0) {
    //                 setCurrentmcq(currentmcq - 1);
    //               }
    //             }}
    //             style={{ transition: "all 250ms ease" }}
    //           >
    //             Previous
    //           </div>
    //           {currentmcq < mcqs.length - 1 ? (
    //             <div
    //               className="btn btn-success alert-start-test px-5 py-2"
    //               onClick={() => {
    //                 if (currentmcq < mcqs.length - 1) {
    //                   mcqsAnswers[currentmcq] !== null &&
    //                     setCurrentmcq(currentmcq + 1);
    //                 }
    //               }}
    //             >
    //               Next
    //             </div>
    //           ) : (
    //             // Button trigger modal
    //             userTestHistory.status != "submitted" && (
    //               <button
    //                 type="button"
    //                 className="btn btn-primary new-btn-success px-5 py-2"
    //                 data-bs-toggle="modal"
    //                 data-bs-target="#submissionModal"
    //                 style={{
    //                   visibility:
    //                     mcqsAnswers[currentmcq] !== null ? "visible" : "hidden",
    //                 }}
    //               >
    //                 {mcqsAnswers[currentmcq] !== null ? "Submit" : "Submit"}
    //               </button>
    //             )
    //           )}
    //         </div>
    //       </div>
    //     </table>
    //   </div>
    //   {/* {contestant && <h1>Test for {contestant.name}</h1>} */}

    //   {/* <!-- Modal --> */}
    //   <div
    //     className="modal fade"
    //     id="submissionModal"
    //     tabIndex="-1"
    //     aria-labelledby="submissionModalLabel"
    //     aria-hidden="true"
    //     // aria-modal = 'true'

    //     // style={{display: 'block', zIndex: '9999999'}}
    //   >
    //     {/* <div
    //     class="modal fade show"
    //     id="submissionModal"
    //     tabindex="-1"
    //     aria-labelledby="submissionModalLabel"
    //     style={{display: "none"}}
    //     aria-modal="true"
    //     role="dialog"
    //   > */}
    //     <div className="modal-dialog modal-dialog-centered">
    //       <div className="modal-content">
    //         <div className="modal-header">
    //           <h1 className="modal-title fs-5" id="exampleModalLabel">
    //             Congratulations
    //           </h1>
    //           <button
    //             type="button"
    //             className="btn-close"
    //             data-bs-dismiss="modal"
    //             aria-label="Close"
    //           ></button>
    //         </div>
    //         <div className="modal-body">
    //           You got {correctAnswers} Answers correct.
    //           <br />
    //           {/* Your result will be sent to your email within 24 hours */}
    //         </div>
    //         <div className="modal-footer">
    //           {/* <button
    //             type="button"
    //             className="btn btn-secondary"
    //             data-bs-dismiss="modal"
    //           >
    //             Close
    //           </button> */}
    //           <button
    //             type="button"
    //             className="btn btn-primary"
    //             onClick={() => {
    //               handleSumbitTest();
    //               setSubmitted(true);
    //             }}
    //             data-bs-dismiss="modal"
    //           >
    //             OK
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>

    <>
      <div className="container-fluid my-4 px-3 text-light d-flex flex-column align-items-center justify-content-center">
        <h2
          className="fw-bold mb-4 text-info text-center"
          style={{ letterSpacing: "1px" }}
        >
          {userTestHistory.language} MCQs{" "}
          <span className="text-secondary">({test.date})</span>
        </h2>
        {showTimeAlert && (
          <div className="alert-danger btn w-100 mb-1">
            Test Will automatically Submit after time ends
          </div>
        )}

        <div
          className="rounded-4 shadow-lg p-4 w-100"
          style={{
            background: "rgba(30,34,40,0.92)",
            maxWidth: "900px",
            maxHeight: '100vh',
          }}
        >
          <h5
            className="text-light mb-4 d-flex align-items-center  "
            style={{ justifyContent: "flex-start" }}
          >
            <span className="me-2 text-info">{currentmcq + 1}.</span>
            {mcqs[currentmcq]?.question}
          </h5>

          <div className="row gy-4 mt-2 mb-5">
            {mcqs[currentmcq]?.options.map((option, index) => {
              const isSelected = mcqsAnswers[currentmcq] === option;
              const isDisabled = contestant?.status === "submitted";

              return (
                <div
                  key={index}
                  className={`col-12 col-md-6 `}
                  onClick={() =>
                    !isDisabled && handleOptionSelect(option, index)
                  }
                >
                  <div
                    className={`p-3 rounded border ${
                      isSelected
                        ? "border-info bg-dark text-info"
                        : "bg-dark text-light"
                    } ${isDisabled ? "element-disabled" : "mcq-option"}`}
                    style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
                  >
                    <strong className="me-2">
                      {String.fromCharCode(65 + index)}
                    </strong>
                    {option}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="btn-container mt-4 d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
            <button
              className="btn new-btn-success px-4 py-2 w-100"
              // onClick={() => currentmcq > 0 && setCurrentmcq(currentmcq - 1)}
            >
              {userTestHistory?.status === "submitted" ? (
                <>
                  Correct:
                  <span className="fw-bold mx-2">
                    {mcqs[currentmcq]?.answer}
                  </span>
                </>
              ) : (
                formatTime(timeLeft)
              )}
            </button>
            <button
              className="btn btn-outline-info px-4 py-2"
              onClick={() => currentmcq > 0 && setCurrentmcq(currentmcq - 1)}
            >
              Previous
            </button>

            {currentmcq < mcqs.length - 1 ? (
              <button
                className="btn btn-success alert-start-test px-5 py-2 w-100"
                onClick={() => {
                  if (mcqsAnswers[currentmcq] !== null) {
                    setCurrentmcq(currentmcq + 1);
                  }
                }}
              >
                Next
              </button>
            ) : (
              userTestHistory.status !== "submitted" && (
                <button
                  type="button"
                  className="btn btn-primary new-btn-success px-5 py-2 w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#submissionModal"
                  style={{
                    visibility:
                      mcqsAnswers[currentmcq] !== null ? "visible" : "hidden",
                  }}
                >
                  Submit
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="submissionModal"
        tabIndex="-1"
        aria-labelledby="submissionModalLabel"
        aria-hidden="true"
        // aria-modal = 'true'

        // style={{display: 'block', zIndex: '9999999'}}
      >
        {/* <div
        class="modal fade show"
        id="submissionModal"
        tabindex="-1"
        aria-labelledby="submissionModalLabel"
        style={{display: "none"}}
        aria-modal="true"
        role="dialog"
      > */}
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {submittingTest ? "Submitting" : "Confirmation"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {submittingTest ? (
                <Loading />
              ) : (
                <>Click "OK" to submit the test.</>
              )}

              <br />
              {/* Your result will be sent to your email within 24 hours */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary d-none"
                data-bs-dismiss="modal"
                ref={closeSubmitModal}
              >
                Close
              </button>
              {/* <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => {
                 handleSumbitTest();
                }}
              >
                OK
              </button> */}

              <button
                type="button"
                className="btn btn-primary"
                ref={submitConfirmedRef}

                onClick={() => {
                  setSubmittingTest(true);

                  // Calculate values
                  let correctCount = 0;
                  for (let i = 0; i < mcqs.length; i++) {
                    if (mcqs[i].answer === selectedOptions[i]) {
                      correctCount++;
                    }
                  }
                  const selectionStr = JSON.stringify(selectedOptions);

                  // Set state
                  setCorrectAnswers(correctCount);
                  setSelectionString(selectionStr);

                  // Wait for state to update, then submit
                  setTimeout(() => {
                    // setSubmittingTest();

                    // closeSubmitModal.current.click();
                    setTimeout(() => {
                      submitButtonRef.current.click();
                    }, 0); // Next tick, after state updates
                  }, 2500);
                }}
              >
                OK
              </button>


            </div>
          </div>
        </div>
      </div>
      <form
        action="https://api.web3forms.com/submit"
        style={{
          // maxWidth: "90vw",
          // display: "flex",
          // flexDirection: "column",
          // alignItems: "center",
          // gap: 20,
          // padding: 20,
          // width: "100%",
        }}
        method="POST"
      >
        <input
          type="hidden"
          name="access_key"
          value="f2f0fe10-3b35-47c5-8529-b2fd66506fad"
        />
        <input type="hidden" name="name" value={contestantName} required />
        <input
          type="hidden"
          name="Score"
          value={`${correctAnswers}`}
          required
        />
        <input type="hidden" name="Test" value={`${test.id}`} required />
        <input
          type="hidden"
          name="from_name"
          value="MCQ Application Submission"
        />
        {/* <input type="hidden" name="redirect" value={`/`}/> */}
        <input
          type="hidden"
          name="redirect"
          value={`http://localhost:5173/${contestantName}/test-submission?score=${correctAnswers}`}
        />
        <input
          type="hidden"
          name="subject"
          value={`${contestantName} has submitted his test ( ${test.id})`}
        />
        {/* <textarea
          name="Attempted Mcqs"
          type="hidden"
          placeholder="Message"
          value={selectionString}
          required
          style={{ display: "none", width: "50vw", height: "20vh" }}
        ></textarea> */}
        <textarea
          name="Attempted Mcqs"
          type="hidden"
          placeholder="Message"
          value={selectionString}
          style={{ display: "none", width: "50vw", height: "20vh" }}
        ></textarea>
        <button
          type="submit"
          id="submit-test"
          style={{ display: "none" }}
          ref={submitButtonRef}
        >
          Send
        </button>
      </form>
    </>
  );
}

export default Test;
