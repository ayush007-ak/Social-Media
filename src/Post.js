import React, { useState , useEffect } from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";
import {db} from './firebase';
import firebase from 'firebase';

function Post({postId ,username , user, caption , imageUrl}){   /* Destructor with ES6 syntx*/
    
    const [comments , setComments] = useState([]);
    const [comment, setComment] = useState('');


    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe=db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp',  'desc')
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }

        return () => {
            unsubscribe();
        };
    }, [postId]);



       const postComment = (event) =>{
           event.preventDefault();

           db.collection("posts").doc(postId).collection("comments").add({
               text:  comment,
               username: user.displayName,
               timestamp: firebase.firestore.FieldValue.serverTimestamp()
           });
           setComment('');

       }


                                                               
    return(
        <div className="post">
            <div className="post_header">
              <Avatar className="post_avatar"
              alt='ayush98'
              src="https://is2-ssl.mzstatic.com/image/thumb/Purple113/v4/95/4e/05/954e0568-9163-b46b-f610-e21b6131bf46/AppIcon-0-1x_U007emarketing-0-5-0-0-sRGB-85-220.png/246x0w.png"/> 

           <h3>{username}</h3>
            </div>

            
            
           

            <img className="post_image" src={imageUrl}/>

            {/* header -> avatar -> username*/}
    <h4 className="post_text"><strong> {username}</strong> {caption}</h4> 
    



    <form className="post_commentBox"> 
        <input className="post_input"
        type="text"
        placeholder="Add a comment..."             //Update the state when we type in
        value={comment}
        onChange={(e) => setComment(e.target.value)}/> 


         <button className="post_button"
    disabled={!comment}
    type="submit"
    onClick={postComment}>
        post
    </button> 
    </form>

   

        </div>
    )
}

export default Post;