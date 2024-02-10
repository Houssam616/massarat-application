// PostDetail.js

import React, { useState, useEffect } from 'react';
import './styles.css'; // Import CSS file


const PostDetail = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await fetch(`http://jsonplaceholder.typicode.com/posts/${postId}`);
        const postData = await postResponse.json();
        setPost(postData);

        const commentsResponse = await fetch(`http://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching post and comments:', error);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <strong>{comment.name}</strong> - {comment.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetail;
