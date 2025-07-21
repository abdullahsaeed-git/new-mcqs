import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

export default function ContestantLogin() {
  const {search} = useLocation()
  const [db, setdb] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { contestantName } = useParams();
  const [user, setUser] = useState(null)
  const [authorized, setAuthorized] = useState(false);
  const[loading, setLoading] = useState(true)
  // const user = db.users.find(u => u.username === contestantName);

  useEffect(() => {
    fetch("/assets/data/db.json")
      .then((res) => res.json())
      .then((data) => {
        setdb(data);
      })
      .catch((error) => console.error("Error loading db.json:", error));
  }, [search]);

  useEffect(() => {
   if(!db) return;
    const user = db.users.find(
      (u) => u.username.toLowerCase() === contestantName.trim().toLowerCase()
    );

      
      setUser(user)
      setLoading(false)
  }, [db, contestantName]);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length > 0 && user.password === password) {
      navigate(`/${contestantName}/performance?pass=${password}`);
    } else {
      setError("Invalid password");
    }
  };
  
  if(loading) return <Loading/>

  if (user === undefined || user === null ) {
    return (
      !loading &&
      <div className="container mt-5">
        <h2>User Not Found</h2>
        <div
          className="btn btn-outline-primary"
          onClick={() => {
            navigate("/");
          }}
        >
          Go Back
        </div>
      </div>
    );
  }


  return (
    <div
      className="container mt-5 "
      style={{ maxWidth: 400, textAlign: "left" }}
    >
      <h2 className="mb-4 " style={{ textAlign: "center" }}>
        Contestant Login <br />{" "}
        <span className={`${contestantName.length > 15 && "fs-4"}`}>
          ( {contestantName} )
        </span>
      </h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="password " className="mb-2 text-align-left d-block">
          {" "}
          Password:{" "}
        </label>
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-success w-100" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
