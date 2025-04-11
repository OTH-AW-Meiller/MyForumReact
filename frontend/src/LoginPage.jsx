import React, { useState, useEffect } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Überprüfe beim Laden der Seite, ob der Benutzer angemeldet ist
  useEffect(() => {
    const loggedInStatus = sessionStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // Sende die Login-Daten an das Backend
    fetch(`http://localhost/backend/api.php?q=verify&name=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Login-Daten:', data.success);
        if (data.success) {
          setMessage('Login erfolgreich!');
          setIsLoggedIn(true);
          sessionStorage.setItem('isLoggedIn', 'true'); // Speichere den Login-Status in der Session
        } else {
          setMessage('Login fehlgeschlagen. Bitte überprüfe deine Eingaben.');
        }
      })
      .catch((error) => {
        console.error('Fehler:', error);
        setMessage('Ein Fehler ist aufgetreten.');
      });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn'); // Entferne den Login-Status aus der Session
    setMessage('Du wurdest abgemeldet.');
  };

  return (
    <div>
      <h2>Login</h2>
      {isLoggedIn ? (
        <div>
          <p>Du bist angemeldet.</p>
          <button onClick={handleLogout}>Abmelden</button>
        </div>
      ) : (
        <div>
          <div>
            <input
              type="text"
              placeholder="Benutzername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin}>Anmelden</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginPage;