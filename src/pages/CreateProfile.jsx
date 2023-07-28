import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';




function CreateProfilePage() {

  const {id} = useParams()

  const { user } = useContext(AuthContext);
  console.log(user);

  

  // State-Hooks verwenden, um das Formular zu verwalten
  const [form, setForm] = useState({
    ProfilePicture: '',
    JoinedClass: null, // null bedeutet, dass noch nichts ausgewählt ist
    AttendedClass: '',
    Age: null,
  });

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  

  // Handler-Funktion, um das ausgewählte Profilbild im Formularzustand zu speichern
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setForm((prevForm) => ({
      ...prevForm,
      ProfilePicture: imageUrls[index],
    }));
  };

  const imageUrls = [
    "https://res.cloudinary.com/dfq746dyv/image/upload/v1689409594/Bildschirmfoto_2022-06-19_um_16.13_1_gtyqcp.png",
    "https://res.cloudinary.com/dfq746dyv/image/upload/v1689873156/Bildschirmfoto_2022-06-19_um_16.53_1_wwoys6.png",
    "https://res.cloudinary.com/dfq746dyv/image/upload/v1689873164/Bildschirmfoto_2022-06-19_um_16.54_1_vqha76.png",
    "https://res.cloudinary.com/dfq746dyv/image/upload/v1689873183/Bildschirmfoto_2022-06-19_um_16.11_1_ldgy2n.png"
  ];


  
  // Handler-Funktion, um die JoinedClass-Auswahl im Formularzustand zu speichern
  const handleJoinedClassChange = (value) => {
    setForm((prevForm) => ({
      ...prevForm,
      JoinedClass: value,
      // remember to change the value of AGE to empty string if Joinedclass is false
      // and change attendedclass if Joineclass is false
    }));
  };

  // Handler-Funktion, um Formularänderungen zu verarbeiten (z. B. AttendedClass und Age)
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const navigate = useNavigate();

  // Handler-Funktion für das Formular-Submit-Ereignis
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/profile/create-profile/${id}`, form);
    console.log('Profile created:', response.data);
    //const newUser = {...user, profile_id: response.data._id}
    localStorage.setItem('quizId', response.data._id)


    // Weiterleitung zur Quiz-Seite
    //navigate(`/quiz-startpage/${response.data._id}`);
    navigate(`/quiz-startpage/${response.data._id}`);

  } catch (error) {
    console.error('Failed to create profile:', error.message);
  }
};

  return (
    <>
      <div className="ProfilePage text-white flex flex-col items-center justify-start min-h-screen pt-20 space-y-4">
  <h1 className="text-6xl font-bold">Erstelle dein Profil</h1>

  <form onSubmit={handleSubmit} className="space-y-4 text-center">
    <h2 className="text-xl">Such dir ein Profilbild aus</h2>

    <div className="flex items-center justify-center space-x-4 pb-2">
      {imageUrls.map((imageUrl, index) => (
        <div
          key={index}
          onClick={() => handleImageClick(index)}
          className={`w-20 h-20 cursor-pointer border-4 transition-all duration-200 ease-in-out ${
            index === selectedImageIndex
              ? "border-purple-800 bg-opacity-50 bg-black"
              : "border-gray-300"
          }`}
        >
          <img
            className="w-full h-full object-cover"
            src={imageUrl}
            alt={`Profile ${index}`}
          />
        </div>
      ))}
    </div>

    <div>
      <h2 className="text-xl pb-4">Hast du bei Tech4Girls einen Kurs belegt?</h2>
      <div className="flex items-center justify-center space-x-4">
        <button
          type="button"
          onClick={() => handleJoinedClassChange(true)}
          className={`px-4 py-2 rounded text-white ${
            form.JoinedClass === true ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          Ja
        </button>
        <button
          type="button"
          onClick={() => handleJoinedClassChange(false)}
          className={`px-4 py-2 rounded text-white ${
            form.JoinedClass === false ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          Nein
        </button>
      </div>
    </div>

    {form.JoinedClass === true && (
      <label className="block text-xl">
        Attended Class:
        <select
          name="AttendedClass"
          value={form.AttendedClass}
          onChange={handleChange}
          className="block w-full my-2 p-2 rounded bg-white text-black"
        >
          <option value="">Select class</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="Codingspiele 1">Codingspiele 1</option>
          <option value="Codingspiele 2">Codingspiele 2</option>
        </select>
      </label>
    )}

    {form.JoinedClass === false && (
      <label className="block text-xl">
        Age:
        <input
          className="block w-full my-2 p-2 rounded bg-white text-black"
          type="number"
          name="Age"
          value={form.Age}
          onChange={handleChange}
        />
      </label>
    )}

    <button className="px-4 py-2 mt-4 bg-blue-500 rounded text-white">Create Profile</button>
  </form>
</div>


    </>
  );
}

export default CreateProfilePage;