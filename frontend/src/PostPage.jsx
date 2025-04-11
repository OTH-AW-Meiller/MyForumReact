import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PostPage() {
  const { id } = useParams(); // ID des angeklickten Threads
  const [posts, setPosts] = useState(null);
  const [newPost, setNewPost] = useState(''); // State für das Eingabefeld

  useEffect(() => {
    // Fetch posts for the selected thread
    fetch(`http://localhost/backend/api.php?q=posts&threadId=${id}`)
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, [id]);

  const handlePostSubmit = () => {
    if (newPost.trim() === '') return; // Leere Eingaben ignorieren

    // Sende den neuen Post an das Backend
    fetch(`http://localhost/backend/api.php?q=newpost&threadId=${id}&text=${encodeURIComponent(newPost)}`)
      .then((data) => {
          // Aktualisiere die Posts-Liste mit dem neuen Post
          setPosts((prevPosts) => [...prevPosts, { id: data.id, text: newPost }]);
          setNewPost(''); // Eingabefeld zurücksetzen
      });
  };

  return (
    <div>
      <h2>Posts for Thread {id}</h2>
      {posts ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.text}</li>
          ))}
        </ul>
      ) : (
        <p>Late posts...</p>
      )}
      <div>
        <input
          type="text"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Neuen Post eingeben"
        />
        <button onClick={handlePostSubmit}>Absenden</button>
      </div>
    </div>
  );
}

export default PostPage;