import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function NavBar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
<nav className="sticky top-0 z-50 bg-white bg-opacity-10 backdrop-filter backdrop-blur text-white bg-color-red flex justify-between items-center mx-auto px-4">
  <div className="flex-grow-0 ml-4 mt-4 mb-4">
    <Link to="/">
      <img
        src={`${process.env.PUBLIC_URL}/tech4girlslogo.png`}
        alt="Logo"
        style={{ height: "30px" }}
      />
    </Link>
  </div>

  <div className="flex justify-center space-x-16 flex-grow">
    <Link to="/" className="mr-4 mt-2">
      <button>Home</button>
    </Link>

    {isLoggedIn && (
      <>
        <button className="mr-4 mt-2" onClick={logOutUser}>Logout</button>

        <Link className="mr-4 mt-2" to="/profile">
          <button>Profile</button>
        </Link>

        <span className="mr-4 mt-2">{user && user.name}</span>
      </>
    )}

    {!isLoggedIn && (
      <>
        <Link className="mr-4 mt-2" to="/signup">
          <button>Sign Up</button>
        </Link>
        <Link className="mr-4 mt-2" to="/login">
          <button>Login</button>
        </Link>
      </>
    )}
  </div>
</nav>


  );
}

export default NavBar;
