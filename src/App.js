import React, { useState , useEffect } from 'react';
import logo from '../src/images/insta.png';
import './App.css';
import Post from './Post';
import {db} from './firebase';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button , Input} from '@material-ui/core';
import { auth } from './firebase';




function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));




function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [openSignIn , setOpenSignIn] = useState('false');
  const [posts, setPosts] = useState([]);
  const [open , setOpen] = useState(false);
  const [username , setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser] = useState(null);


useEffect(() => {
  const unsubscribe=auth.onAuthStateChanged((authUser) => {      //<- this is like backedn listener
    if (authUser){
                                 //user has logged in
      console.log(authUser);
      setUser(authUser);

    } else{
                             //user has logged out
      setUser(null);
    }
})   
return() =>{
  //perform some clean up action
  unsubscribe();
}                              //listner
}, [user, username]);








//UseEffectruns piece of code bosed on specific condtion //runs code when page refreshes
  useEffect(() => {
    //this where the code runs
   db.collection('posts').onSnapshot(snapshot => {

    setPosts(snapshot.docs.map(doc =>  ({ id: doc.id , post:doc.data()})));
     //everytime new post is added this code fires

   })
  }, []);



  const signUp = (event) =>{
    event.preventDefault();

    auth

    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username,
      })
    })                          //passing from state variable
    .catch((error)=> alert(error.message))
    setOpen(false);

  }
                                                           //WE USED CONDTION RENDERING


  const signIn = (event) => {
    event.preventDefault();

    auth
    .signInWithEmailAndPassword(email , password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false);
  }


  const handleClose = () =>{
    setOpen(false);
  };
                                                                
  return (
    <div className="App">
  <Modal
        open={open}       //inline function
        onClose={() => setOpen(false)}  >     
        
        <div style={modalStyle} className={classes.paper}>
        

        <form className="app_signup">
          

          <center>
              < img
               className="app_headerImage"
               src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS25MGr4FC2zCXvHvxb56Vu2ZpkeoVv9vRkAg&usqp=CAU"
               alt=""/>
          </center> 
            
          <Input placeholder="username"
             type="text"
            value={username}
              onChange={(e) => setUsername(e.target.value)}
            /> 
 
            <Input placeholder="email"
            type="text"
           value={email}
             onChange={(e) => setEmail(e.target.value)}
            />
 
           <Input placeholder="password"
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
            />

            
 
            <Button  type="Submit" onClick={signUp}>Sign Up</Button>

         </form> 
           </div>
         </Modal>          

         

         <Modal
        open={openSignIn}       //inline function
        onClose={() => setOpenSignIn(false)}  >     
        
        <div style={modalStyle} className={classes.paper}>
        

        <form className="app_signup">
          

          <center>
              < img
               className="app_headerImage"
               src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS25MGr4FC2zCXvHvxb56Vu2ZpkeoVv9vRkAg&usqp=CAU"
               alt=""/>
          </center> 
            
          
 
            <Input placeholder="email"
            type="text"
           value={email}
             onChange={(e) => setEmail(e.target.value)}
            />
 
           <Input placeholder="password"
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
            />

            
 
            <Button  type="Submit" onClick={signIn}>Sign In</Button>

         </form> 
           </div>
         </Modal>













    <div className="app_header">
      <img className="app_headerImage"
      src={logo} height="80" width="100"alt=""/>
    </div>


      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ): ( 
        <div className="app_loginContainer">
         <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
         <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>

         
      )}
    

    <h1>Hey there</h1>
{
     posts.map(({id , post}) => (
    <Post key={id} username={post.username} caption={post.caption}imageUrl={post.imageUrl}/>
     
  ))
}
    
    </div>
  );
}

export default App;
