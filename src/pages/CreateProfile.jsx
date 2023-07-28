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
      <div>
        <h1>Profile page</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Such dir ein Profilbild aus</h2>
        <div>
          <div>
            {imageUrls.map((imageUrl, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(index)}
                style={{
                  width: "100px",
                  height: "100px",
                  border: index === selectedImageIndex ? "4px solid #00ff00" : "2px solid #ccc",
                  borderRadius: "50%",
                  cursor: "pointer",
                  overflow: "hidden",
                  marginRight: "20px"
                }}
              >
                <img
                  src={imageUrl}
                  alt={`Profile ${index}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Radio Buttons für die JoinedClass-Auswahl mit Button-Stil */}
          <h2>Hast du bei Tech4Girls einen Kurs belegt?</h2>
          <button
            type="button"
            onClick={() => handleJoinedClassChange(true)}
            style={{ backgroundColor: form.JoinedClass === true ? '#00ff00' : '#ccc' }}
          >
            Ja
          </button>
          <button
            type="button"
            onClick={() => handleJoinedClassChange(false)}
            style={{ backgroundColor: form.JoinedClass === false ? '#00ff00' : '#ccc' }}
          >
            Nein
          </button>
        </div>

        {/* Anzeigen von AttendedClass oder Age basierend auf der Auswahl */}
        {form.JoinedClass === true && (
          <label>
            Attended Class:
            <select name="AttendedClass" value={form.AttendedClass} onChange={handleChange}>
              <option value="">Select class</option>
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="Codingspiele 1">Codingspiele 1</option>
              <option value="Codingspiele 2">Codingspiele 2</option>
            </select>
          </label>
        )}

        {form.JoinedClass === false && (
          <label>
            Age:
            <input
              type="number"
              name="Age"
              value={form.Age}
              onChange={handleChange}
            />
          </label>
        )}

        <button type="submit">Create Profile</button>
      </form>
    </>
  );
}

export default CreateProfilePage;