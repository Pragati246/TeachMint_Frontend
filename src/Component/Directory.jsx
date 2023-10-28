import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Directory() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users').then((response) =>
        response.json()
      ),
      fetch('https://jsonplaceholder.typicode.com/posts').then((response) =>
        response.json()
      ),
    ])
      .then(([users, posts]) => {
        const nameCount = GetUserName(users);
        const postCount = countUserPosts(posts);
        const combinedData = users.map((user) => ({
          id: user.id,
          name: user.name,
          postCount: postCount[user.id] || 0,
        }));
        setUserData(combinedData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  function GetUserName(data) {
    const nameCount = {};

    data.forEach((item) => {
      const userName = item.name;
      if (nameCount[userName]) {
        nameCount[userName]++; // Increment count if the name already exists in nameCount object
      } else {
        nameCount[userName] = 1; // Initialize count to 1 for the new name
      }
    });

    return nameCount;
  }

  function countUserPosts(data) {
    const postCount = {};

    data.forEach((post) => {
      const userId = post.userId;
      if (postCount[userId] === undefined) {
        postCount[userId] = 1;
      } else {
        postCount[userId]++;
      }
    });

    return postCount;
  }

  return (
    
    <div class="directoryRoot">
      <h1 className="directory">Directory</h1>
      {userData.map(({ id, name, postCount }) => (
        <DirectoryCard key={id} userId={id} name={name} postCount={postCount} />
      ))}
    </div>
  );
}

function DirectoryCard({ id, name, postCount, userId }) {
  return (
    <Link to={`/ProfilePage/`+userId}>
      <div className="card-body">
        <div className="card">
        <p>Name: {name}</p>
        <p>Posts: {postCount}</p>

        </div>
      </div>
    </Link>
  );
}


export default Directory;