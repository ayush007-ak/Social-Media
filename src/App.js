import React, { useState , useEffect } from 'react';
import logo from '../src/images/insta.png';
import './App.css';
import Post from './Post';
import {db} from './firebase';


function App() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //this where the code runs
   db.collection('posts').onSnapshot(snapshot => {

    setPosts(snapshot.docs.map(doc => doc.data()));
     //everytime new post is added this code fires

   })
  }, []);
                                                                
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
