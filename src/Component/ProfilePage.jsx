import React, { useState } from 'react';
import CountrySelector from './CountrySelector';
import Clock from './Clock';

import {useParams , Link} from 'react-router-dom'

function ProfilePage() {

  const {userId} = useParams()
  const [selectedCountry, setSelectedCountry] = useState('');
  const [profile, setProfile] = useState('');
  var [address, setAddress] = useState('');
  var [company, setCompany] = useState('');

  const [allPosts, setPosts] = useState('');


  const handleCountrySelect = country => {
    setSelectedCountry(country);
    
  };

console.log("userId"+userId);
 const currentUserId=userId;
  React.useEffect(() => {
      
    fetch(`https://jsonplaceholder.typicode.com/users/${currentUserId}`)
    .then(response => response.json())
    .then(data => {
      setProfile(data);
      setAddress(data.address);
      setCompany(data.company);
    })

  }, [])

  React.useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then(response => response.json())
      .then(data => {
        const postsByUser = data.reduce((accumulator, post) => {
          const userId = post.userId;
          if (!accumulator[userId]) {
            accumulator[userId] = [];
          }
          accumulator[userId].push(post);
          return accumulator;
        }, {});
  
        // Pass the user id to get the specific 
        const userId = currentUserId;
        const userPosts = postsByUser[userId];
        console.log(userPosts);
        setPosts(userPosts);
      });
  }, []);

  return (
    <div>
      <div className="bttn-back">
        <button>
        <Link to="/">Back</Link>
        </button>
      </div>
    <div className="profile-header">
    <div className='dropdown'>
        <CountrySelector onSelectCountry={handleCountrySelect} />
      </div>
      <Clock selectedCountry={selectedCountry} />
    </div>
    <div className="main-class">
    <div className="profile-page-card">
      <p>{profile.name}</p>
      <p>{profile.username} | {company.catchPhrase}</p>
    </div>
    <div className="userclass">
      <p>{address.street}|| {address.suite} || {address.city}</p>
      <p>{profile.email}  | {profile.phone}</p>

    </div>
</div>
<div className="post-card-body">

{ 
        allPosts.length > 0 && 
        allPosts.map(product => 
          <CardDetails {...product} />
        )
      }

  </div>
</div>
  );

  function CardDetails({title, body}){
    return (
    <div className="post-card-body">
      <div className="post-new-card">
      <h2>{title}</h2>
      <p>{body}</p>

      </div>
  </div>
   )
  }

}

export default ProfilePage;

