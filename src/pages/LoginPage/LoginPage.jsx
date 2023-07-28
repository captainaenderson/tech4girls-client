import "./LoginPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios
    /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        const quizId = localStorage.getItem('quizId')
        navigate(`/quiz-startpage/${quizId}`);
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage  flex flex-col items-center justify-start min-h-screen pt-20">
    <h1 className="text-4xl my-4 font-bold text-white">Login</h1>

    <form onSubmit={handleLoginSubmit} className="space-y-4 text-center">
      <div>
        <label className="text-white">Email:</label>
        <input className="block my-2 p-2 rounded-lg" type="email" name="email" value={email} onChange={handleEmail} />
      </div>

      <div>
        <label className="text-white">Password:</label>
        <input className="block my-2 p-2 rounded-lg" type="password" name="password" value={password} onChange={handlePassword} />
      </div>

      <button className="px-4 py-2 mt-4 bg-blue-500 rounded text-white">Login</button>
    </form>

    {errorMessage && <p className="error-message my-4">{errorMessage}</p>}

    <p className="text-white">Don't have an account yet?</p>
    <Link className="underline text-blue-500" to={"/signup"}> Sign Up</Link>
</div>

  );
}

export default LoginPage;
