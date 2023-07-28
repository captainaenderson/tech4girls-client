import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function QuizStartPage() {
  const [profile, setProfile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    console.log('hello')
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/profile/profile/${id}`)
      .then((response) => {
        console.log(response)
        setProfile(response.data);
      })
      .catch((error) => {
        console.error('Fehler beim Abrufen des Profils', error);
      });
  }, [id]);

  if (!profile) {
    return <div>Ich sehe gar kein Profil</div>;
  }

  const { JoinedClass, AttendedClass } = profile;

  // JSX für die Auswahlmöglichkeiten basierend auf den Profilabfrage-Antworten
  const renderQuizOptions = () => {
    console.log('renderQuizOptions called');
    console.log('JoinedClass:', JoinedClass);
    console.log('AttendedClass:', AttendedClass);
    if (JoinedClass === true) {
      if (AttendedClass === 'HTML') {
        return (
          <div className="mx-auto w-1/2">
            <h2 className="text-4xl font-bold mb-4">Mit welchem Quiz möchtest du starten?</h2>
            <div className="flex space-x-4">
              <div className="flex-1 p-4 bg-white bg-opacity-30 rounded shadow-md">
                <div className="flex justify-between">
                  <p className="font-bold">HTML</p>
                  <Link to={`/questions/HTML`}>
                    <button className="px-4 py-2 rounded text-white bg-blue-500">Zum Quiz</button>
                  </Link>
                </div>
              </div>
              <div className="flex-1 p-4 bg-white bg-opacity-30 rounded shadow-md">
                <div className="flex justify-between">
                  <p className="font-bold">CSS</p>
                  <Link to={`/questions/CSS`}>
                    <button className="px-4 py-2 rounded text-white bg-blue-500">Zum Quiz</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      } else if (AttendedClass === 'CSS') {
        return (
          <div className="mx-auto w-1/2">
            <h2 className="text-4xl font-bold mb-4">Mit welchem Quiz möchtest du starten?</h2>
            <div className="flex space-x-4">
              <div className="flex-1 p-4 bg-white bg-opacity-30 rounded shadow-md">
                <div className="flex justify-between">
                  <p className="font-bold">CSS</p>
                  <Link to={`/questions/CSS`}>
                    <button className="px-4 py-2 rounded text-white bg-blue-500">Zum Quiz</button>
                  </Link>
                </div>
              </div>
              <div className="flex-1 p-4 bg-white bg-opacity-30 rounded shadow-md">
                <div className="flex justify-between">
                  <p className="font-bold">Codingspiele 1</p>
                  <Link to={`/questions/Codingspiele 1`}>
                    <button className="px-4 py-2 rounded text-white bg-blue-500">Zum Quiz</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    return null;
  };
  
  return (
    <div className="flex items-start justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white pt-32">
      {renderQuizOptions()}
    </div>
  );
  
};

export default QuizStartPage;
