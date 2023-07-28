import "./App.css";
import { Routes, Route } from "react-router-dom";



import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CreateProfilePage from "./pages/CreateProfile";
import QuizStartPage from "./pages/QuizStartPage";
import QuizPage from "./pages/QuizPage";

import NavBar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";


function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />

       {/* Create-Profile Page */}

       <Route
          path="/create-profile/:id"
          element={
            <IsAnon>
              <CreateProfilePage />
            </IsAnon>
          }
        />

        {/* Quiz-Start Page */}

        <Route
          path="/quiz-startpage/:id"
          element={
            // <IsAnon>
              <QuizStartPage />
            // </IsAnon>
          }
        />

        {/* Quiz Page */}

        <Route
          path="/questions/:category"
          element={
            //<IsAnon>
              <QuizPage />
            //</IsAnon>
          }
        />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            //<IsAnon>
              <SignupPage />
            //</IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
