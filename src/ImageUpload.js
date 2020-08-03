import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import {storage , db} from './firebase';
import firebase from "firebase";


function ImageUpload({username}) {

const [caption , setCaption] = useState('');
const [progress , setProgress] = useState(0);
const [image , setImage] = useState(null);


const handleChange = (e) =>{
    if(e.target.files[0]){
        setImage(e.target.files[0]);
    }
};

const handleUpload = () =>{               //pushing data to database by using db and storage sab yaad rakhna
const uploadTask = storage.ref(`images/${image.name}`).put(image);

uploadTask.on(
    "state_changed",
    (snapshot)=> {
        //progress function ek prakaar se logic
        const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100 //just for visual itna bada code ha
        );
        setProgress(progress);
    },

    (error) => {   //error function ha...
     console.log(error);
     alert(error.message);
    },

    () => {
        //complete function

        storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then(url=>{
            //post image inside db by this ....
            db.collection("posts").add({                                           
                                                                                       //helps to show new post at top
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: url,
                username: username

            });


            setProgress(0);
            setCaption("");
            setImage(null);
        });
    }
    );

  };

    return(
        <div>


        
        
        <progress value={progress} max="100" />

         <input type="text" placeholder='Enter caption....' onChange={event => setCaption(event.target.value)} value={caption}/>
         <input type="file" onChange={handleChange}/>
         <Button onClick={handleUpload}>
             Upload

         </Button>
        </div>
    )
}


export default ImageUpload;