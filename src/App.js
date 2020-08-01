import React, { useState } from 'react';
import logo from '../src/images/insta.png';
import './App.css';
import Post from './Post';

function App() {

  const [posts, setPosts] = useState([
    {
      username:"rahul8" ,
      caption:"nice pics clicks",
      imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTXBQO3AoOMTBDfksSTZW9YKPk2GNCZmlunUg&usqp=CAU"
    },

    {
      username:"rahul8" ,
      caption:"nice pics clicks",
      imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTXBQO3AoOMTBDfksSTZW9YKPk2GNCZmlunUg&usqp=CAU"
    }
  ]);
     /*State is like short term memory store in  react */
  return (
    <div className="App">
 

    <div className="app_header">
      <img className="app_headerImage"
      src={logo} height="80" width="100"alt=""/>
    </div>

    <h1>Hey there</h1>
{
  posts.map(post => (
    <Post username={post.username} caption={post.caption}imageUrl={post.imageUrl}/>
     
  ))
}
    
    </div>
  );
}

export default App;
