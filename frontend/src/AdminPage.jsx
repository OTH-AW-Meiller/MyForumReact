import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const [threads, setThreads] = useState(null);
  const [newThreadName, setNewThreadName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Überprüfe, ob der Benutzer angemeldet ist
    const loggedInStatus = sessionStorage.getItem('isLoggedIn');
    if (loggedInStatus !== 'true') {
      navigate('/login'); // Leite zur Login-Seite um, wenn der Benutzer nicht angemeldet ist
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch all threads from the backend
    fetch('http://localhost/backend/api.php?q=overview')
      .then((response) => response.json())
      .then((data) => setThreads(data));
  }, []);

  const handleDeleteThread = (threadId) => {
    // Delete a thread by ID
    fetch(`http://localhost/backend/api.php?q=removethread&id=${threadId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setThreads((prevThreads) => prevThreads.filter((thread) => thread.id !== threadId));
        } else {
          alert('Fehler beim Löschen des Threads.');
        }
      });
  };

  const handleAddThread = () => {
    if (newThreadName.trim() === '') return; // Leere Eingaben ignorieren

    // Add a new thread
    fetch(`http://localhost/backend/api.php?q=addthread&name=${newThreadName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setThreads((prevThreads) => [...prevThreads, { id: data.id, name: newThreadName }]);
          setNewThreadName(''); // Eingabefeld zurücksetzen
        } else {
          alert('Fehler beim Hinzufügen des Threads.');
        }
      });
  };

  return (
    <div>
      <h1>Admin-Bereich</h1>
      <h2>Threads verwalten</h2>
      {threads ? (
        <ul>
          {threads.map((thread) => (
            <li key={thread.id}>
              {thread.name}{' '}
              <button onClick={() => handleDeleteThread(thread.id)}>Löschen</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading threads...</p>
      )}
      <div>
        <h3>Neuen Thread hinzufügen</h3>
        <input
          type="text"
          value={newThreadName}
          onChange={(e) => setNewThreadName(e.target.value)}
          placeholder="Thread-Name eingeben"
        />
        <button onClick={handleAddThread}>Hinzufügen</button>
      </div>
    </div>
  );
}

export default AdminPage;