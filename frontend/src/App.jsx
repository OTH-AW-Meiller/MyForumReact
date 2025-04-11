import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostPage from './PostPage';
import LoginPage from './LoginPage'; // Importiere die Login-Seite
import AdminPage from './AdminPage'; // Importiere die Admin-Seite

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the PHP backend
    fetch('http://localhost/backend/api.php?q=overview')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Mein Forum</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/admin">Admin</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              data ? (
                <ul>
                  {data.map((link) => (
                    <li key={link.id}>
                      <Link to={`/posts/${link.id}`}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Loading...</p>
              )
            }
          />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} /> {/* Admin-Seite */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;