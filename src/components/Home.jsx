import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const [db, setdb] = useState(null);
  const [showTerms, setShowTerms] = useState(false);
  const [newTestDate, setNewTestDate] = useState("");
  const [newTestName, setNewTestName] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [viewPostHeight, setViewPortHeight] = useState(window.innerHeight);
  const [viewPortWidth, setViewPortWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  const {search} = useLocation();
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    if (viewPortWidth < 768) {
      setIsMobile(true);
    }
    AOS.init();
  }, []);

  
  
  useEffect(() => {
    fetch("/assets/data/db.json")
    .then((res) => res.json())
    .then((data) => {setdb(data); });
  }, []);
  
useEffect(() => {
  if (!db) return;
  const user = db.users.find(
    (u) => u.username.toLowerCase() === userName.trim().toLowerCase()
  );
  setUser(user);
  // setLoading(false); // ← remove or define this if you need it
}, [db, userName]);


  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    if (user === undefined || user === null) {
      // console.log(user, userName);
      setError("User Not Found");
    } else {
      const lowercaseUserName = userName.trim().toLowerCase();
     window.open(`/${lowercaseUserName}/`);
    }
  };

  return (
    <div
      className="min-vh-100 bg-dark text-light  rounded-5"
      style={{
        background:
          "radial-gradient(ellipse at top left, #232526 60%, #0f2027 100%)",
      }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm  rounded-5">
        <div className="container-fluid px-4">
          <Link
            className="navbar-brand fw-bold fs-3"
            style={{ color: "#00d8ff", letterSpacing: "2px" }}
            to="/"
          >
            <span style={{ fontWeight: 700 }}>TectonicStrike</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-2">
              <li className="nav-item">
                <Link
                  className="nav-link text-success fs-5 "
                  onClick={() => {
                    window.scrollTo(0, document.body.scrollHeight);
                  }}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div
        className={`text-center ${
          isMobile ? "p-2" : "p-5"
        } rounded-4 w-100 mx-auto`}
        style={{
          background: "rgba(30,34,40,0.92)",
          maxWidth: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <h1
          className="display-2 fw-bold mb-4"
          style={{
            letterSpacing: "3px",
            color: "#00d8ff",
            textShadow: "0 2px 16px #00d8ff33",
          }}
        >
          {/* TectonicStrike */}
        </h1>
        <p
          className="lead mb-5 fs-4 lh-lg"
          style={{ maxWidth: 650, margin: "0 auto", color: "#e0e0e0" }}
        >
          <span className="fw-semibold">Welcome to TectonicStrike</span> — the
          premier platform for developers to{" "}
          <span style={{ color: "#00ffa3" }}>earn real money</span> by
          showcasing their skills in MCQ-based coding tests.
        </p>
        {/* 

        <div className="row justify-content-center mb-5 g-4">
          <div className="col-md-6 col-12">
            <div className="bg-transparent border-0 p-3 rounded-3 h-100 text-start">
              <h5 className="text-info mb-3">Why TectonicStrike?</h5>
              <ul className="list-unstyled text-start fs-5 lh-lg">
                <li>
                  <span className="text-info">• </span>Win $20 by solving dev
                  MCQs
                </li>
                <li>
                  <span className="text-info">• </span>No ads, no fluff—just
                  skill
                </li>
                <li>
                  <span className="text-info">• </span>New Quiz Every Week
                </li>
                <li>
                  <span className="text-info">• </span>100% fair and skill-based
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-12 d-flex align-items-start justify-content-">
            <div className="bg-transparent border-0 p-3 rounded-3 w-100 text-start">
              <h5 className="text-info mb-3">How It Works</h5>
              <ul className="list-unstyled text-start fs-5 lh-lg">
                <li>
                  <span className="text-info">• </span> Sign up in seconds
                </li>
                <li>
                  <span className="text-info">•</span> Pay $5 to enter
                </li>
                <li>
                  <span className="text-info">•</span> Solve 20 MCQs in time
                </li>
                <li>
                  <span className="text-info">•</span> Prize sent within 24 hrs
                </li>
              </ul>
            </div>
          </div>
        </div> */}

        <div className="row g-4 justify-content-center mt-4 mb-5">
          <div className="col-md-5 col-sm-12">
            <div className="p-4 rounded-4 shadow-sm  h-100 border border-secondary-subtle">
              <h5 className="mb-3" style={{ color: "#33f1ff" }}>
                🌟 Why TectonicStrike?
              </h5>
              <ul className="list-unstyled fs-5 lh-lg">
                <li>
                  💸 Win <strong>$20</strong> per quiz
                </li>
                <li>🚫 No fluff—just skill</li>
                <li>📆 Weekly quizzes</li>
                <li>✅ 100% fair and automated</li>
              </ul>
            </div>
          </div>

          <div className="col-md-5 col-sm-12">
            <div className="p-4 rounded-4 shadow-sm  h-100 border border-secondary-subtle">
              <h5 className="mb-3" style={{ color: "#33f1ff" }}>
                🛠️ How It Works
              </h5>
              <ul className="list-unstyled fs-5 lh-lg">
                <li>⚡ Sign up instantly</li>
                <li>💳 Pay $5 entry</li>
                <li>🧠 Solve 20 MCQs</li>
                <li>💰 Get paid in 24 hours</li>
              </ul>
            </div>
          </div>
        </div>

        <p
          className="mb-5 fs-5 lh-lg"
          style={{ maxWidth: 650, margin: "0 auto", color: "#b0b0b0" }}
        >
          <span className="fw-semibold">
            Ready to take your skills to the next level?
          </span>{" "}
          <br />
          Sign up for a test, compete, and start earning today!
        </p>
        <div className="d-flex flex-column justify-content-center align-items-center gap-2 mb-3 flex-wrap">
          {/* <form onSubmit={(e) => handleLoginFormSubmit(e)}>
            <label htmlFor="text text-align-left mb-2">
              Enter The Username:{" "}
            </label>
            {error && (
              <div className=" alert alert-danger p-3 m-1 ">{error}</div>
            )}
            <input
              className="form-control my-2"
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setError(null);
              }}
              required
            />
            <button className="btn btn-success w-100" type="submit">
              Login
            </button>
          </form> */}

          <form
            className=" border border-secondary-subtle rounded-4 p-4 shadow-sm w-100 mx-auto text-left"
            style={{ maxWidth: 400 }}
            onSubmit={handleLoginFormSubmit}
          >
            <label
              className="form-label   "
              style={{ color: "#94a3b8", width: "100%", textAlign: "left" }}
            >
              Enter your username
            </label>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            <input
              className="form-control mb-3"
              type="text"
              placeholder="e.g. dev_wizard"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setError(null);
              }}
              required
            />
            <button className="btn btn-success w-100">Login</button>
          </form>
          <div
            className=" fs-6 text-primary "
            style={{
              cursor: "pointer",
            }}
            onClick={() => setShowTerms(true)}
          >
            Terms and Policy
          </div>
        </div>

        {showTerms && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ background: "rgba(0,0,0,0.7)", zIndex: 9999 }}
          >
            <div
              className="bg-dark text-light py-3 px-3 rounded-4 shadow-lg"
              style={{ minWidth: "", maxWidth: "90vw", textAlign: "left" }}
            >
              <h1 className="h3 my-2 mx-1 " style={{ color: "#00d8ff" }}>
                Terms and Policy
              </h1>
              <ul
                style={{
                  maxHeight: "60vh",
                  overflowY: "scroll",
                  maxWidth: "90vw",
                  scrollbarWidth: "none",
                }}
                className="list-group list-group-flush "
              >
                <li className="list-group-item">$5 entry is non-refundable</li>
                <li className="list-group-item">
                  No cheating or AI tools allowed
                </li>
                <li className="list-group-item">Fastest high score wins</li>
                <li className="list-group-item">
                  Tied scores = faster time wins
                </li>
                <li className="list-group-item">
                  Payout via PayPal or Easypaisa
                </li>
                <li className="list-group-item">
                  Quiz auto-submits at timer end
                </li>
                <li className="list-group-item">
                  One entry per person per quiz
                </li>
                <li className="list-group-item">
                  We may disqualify unfair play
                </li>
                <li className="list-group-item">
                  Early-stage platform, expect bugs
                </li>
              </ul>
              <button
                className="btn btn-outline-info w-100 mt-3"
                onClick={() => setShowTerms(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <p
          className="mb-3 fs-6 lh-lg text-white"
          style={{ maxWidth: 650, margin: "0 auto", color: "#b0b0b0" }}
        >
          <span className="fw-semibold" style={{ color: "#cbd5e1" }}>
            This is just the beginning — real challenges, real rewards, and
            constant upgrades.
          </span>{" "}
        </p>
        <div className="mt-4 small text-secondary">
          <span style={{ color: "#00d8ff" }}>TectonicStrike</span> &copy;{" "}
          {new Date().getFullYear()} &mdash; Empowering Developers
        </div>
      </div>
    </div>
  );
}
