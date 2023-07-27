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
    if (JoinedClass === true) {
      if (AttendedClass === 'HTML') {
        return (
          <div>
            <h2>Auswahlmöglichkeiten</h2>
            <div>
              <p>HTML</p>
              <Link to={`/questions/HTML`}><button>Zum Quiz</button></Link>
            </div>
            <div>
              <p>CSS</p>
              <Link to={`/questions/CSS`}><button>Zum Quiz</button></Link>
            </div>
          </div>
        );
      } else if (AttendedClass === 'CSS') {
        return (
          <div>
            <h2>Auswahlmöglichkeiten</h2>
            <div>
              <p>CSS</p>
              <Link to={`/questions/CSS`}><button>Zum Quiz</button></Link>
            </div>
            <div>
              <p>Codingspiele 1</p>
              <Link to={`/questions/Codingspiele 1`}><button>Zum Quiz</button></Link>
            </div>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div>
      {renderQuizOptions()}
    </div>
  );
};

export default QuizStartPage;
