import "./App.css";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      {/* Add any layout, header, nav, etc. here */}
      <nav
        className="navbar navbar-expand-lg shadow-sm  rounded-5"
        nstyle={{ background: "#181a1b" }}
      >
        <div className="container-fluid px-4">
          <Link 
            className="navbar-brand fw-bold fs-3"
            style={{ color: "#00d8ff", letterSpacing: "2px" }}
            to="/"
          >
            <img
              src="/assets/fav-icon.png"
              alt="tectonicquiz"
              srcset=""
              height={100}
              style={{
                margin: "0 20px",
              }}
            />
            <span style={{ fontWeight: 700 }}>Tectonic Quiz</span>
          </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
