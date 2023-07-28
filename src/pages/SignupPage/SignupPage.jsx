import "./SignupPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const {setUser} = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */

    // Hello world
    // Or using a service
    authService
      .signup(requestBody)
      .then((response) => {
        console.log(response);
        // If the POST request is successful redirect to the create profile page
        setUser(response.data)
        navigate(`/create-profile/${response.data.user._id}`);
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage flex flex-col items-center justify-start min-h-screen pt-20">
    <h1 className="text-4xl my-4 font-bold text-white ">Sign Up</h1>

    <form onSubmit={handleSignupSubmit} className="space-y-4 text-center">
      <div>
        <label className="text-white ">Email:</label>
        <input className="block my-2 p-2 rounded-lg" type="email" name="email" value={email} onChange={handleEmail} />
      </div>

      <div>
        <label className="text-white ">Password:</label>
        <input className="block my-2 p-2 rounded-lg" type="password" name="password" value={password} onChange={handlePassword} />
      </div>

      <div>
        <label className="text-white ">Name:</label>
        <input className="block my-2 p-2 rounded-lg" type="text" name="name" value={name} onChange={handleName} />
      </div>

      <button className="px-4 py-2 mt-4 bg-blue-500 rounded text-white">Sign Up</button>
    </form>

    {errorMessage && <p className="error-message my-4">{errorMessage}</p>}

    <p className="text-white ">Already have account?</p>
    <Link className="underline text-blue-500" to={"/login"}> Login</Link>
</div>






  );
}

export default SignupPage;
