import React from "react";
import Loading from "./Loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
function TestSubmission({ correctAnswers}) {

    const {contestantName} = useParams();
const navigate = useNavigate();
    const {search} = useLocation();
    const params  = new URLSearchParams(search)
    const score = params.get("score")
  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        style={{ background: "rgba(0,0,0,0.7)", zIndex: 9999 }}
      >
        <div
          className="bg-dark text-light py-3 px-3 rounded-4 shadow-lg "
          style={{ minWidth: "80vw", maxWidth: "90vw", textAlign: "left" }}
        >
          <h1
            className="h3 my-2 mx-1 text-center mb-4 "
            style={{ color: "#00d8ff" }}
          >
            Congratulations!! "{contestantName}"
          </h1>
          <ul
            style={{
              maxHeight: "70vh",
              height: "",
              overflowY: "scroll",
              scrollbarWidth: "none",
            }}
            className="list-group list-group-flush "
          >
              <>
                <li className="list-group-item h4 text-center">
                  You have got {score} Answers accurate.
                </li>
                <li className="list-group-item h6">
                  Rewards Wil be announced within 24 hours.
                </li>
                <li className="list-group-item ">
                  Note! <br />
                  Your Test details will be sent you via Email , as soon as
                  possible <br /> Anyways
                  <span
                    style={{
                      color: "#00d8ff",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                    }}
                  >
                    &nbsp; Learn Compete
                  </span>
                  &nbsp; and
                  <span
                    style={{
                      color: "#00d8ff",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                    }}
                  >
                    &nbsp; Earn More.
                  </span>
                </li>
              </>
          </ul>
           <button
            className="btn btn-outline-info w-100 mt-3"
            onClick={() => navigate('/')}
          >
            OK
          </button>
        </div>
      </div>
    </>
  );
}

export default TestSubmission;
