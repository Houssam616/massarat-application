// App.js
import React, { useState, useEffect } from 'react';
import settings from './settings';
import PostDetail from './PostDetail';
import Logs from './logs.js'; // Import the Logs component
import './styles.css'; // Import CSS file
import Logger from './logger.js';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null); // Track the selected post

  useEffect(() => {
    // Log interaction when loading the photo list
    Logger.log('Loading the photo list');

    // Function to fetch posts from the API
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://jsonplaceholder.typicode.com/posts');
        const data = await response.json();

        // Map the response to extract userId and id
        const modifiedData = data.map(post => ({
          ...post,
          userId: post.userId, // Assuming userId is available in the response
          id: post.id // Assuming id is available in the response
        }));

        setPosts(modifiedData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePostClick = (postId) => {
    setSelectedPostId(postId); // Set the selected post ID
    Logger.log('Viewing an item\'s details'); // Log interaction when viewing item's details
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    setSelectedPostId(null); // Reset selectedPostId if the deleted post is currently displayed
    
    // Log interaction when deleting a post
    Logger.log(`Deleting post with ID: ${postId}`);
  };

  const handleGoBack = () => {
    setSelectedPostId(null); // Reset the selected post ID to navigate back
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPost = currentPage * settings.itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - settings.itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (selectedPostId) {
    return (
      <div className="container">
        <div className="go-back-button-container">
          <button onClick={handleGoBack} className="go-back-button">Go Back</button>
        </div>
        <PostDetail postId={selectedPostId} />
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Posts</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <ul className="post-list">
        {currentPosts.map(post => (
          <li key={post.id} className="post-item">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>Word Count: {post.body.split(' ').length}</p>
            <div className="highlighted-info">
              <p className="user-id">User ID: {post.userId}</p> {/* Display userId */}
              <p className="post-id">Post ID: {post.id}</p> {/* Display postId */}
            </div>
            <button onClick={() => handlePostClick(post.id)} className="view-button">View Details</button>
            <button onClick={() => handleDeletePost(post.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
      <ul className="pagination">
        {Array.from({ length: Math.ceil(filteredPosts.length / settings.itemsPerPage) }, (_, index) => (
          <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
            <button onClick={() => paginate(index + 1)} className="pagination-button">{index + 1}</button>
          </li>
        ))}
      </ul>
      <Logs /> {/* Render the Logs component */}
    </div>
  );
};

export default App;
