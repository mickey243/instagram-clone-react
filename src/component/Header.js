import React, { useEffect, useState } from 'react'
import Logo from '../assest/image/insta_logo.png';
import ImageUploade from './ImageUploade';
import ProfileDetail from './ProfileDetail';
//import from Material Ui for modal(login etc...)
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

//import the post component
import Post from './Post';
//config file import
import { db, auth } from '../FireBase/config';
//function for modal
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

const Header = () => {
  //modal for login and logout state.
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  //to access the style function,that is define above.
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  //to store username,email,password while login time.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  const [posts, setPosts] = useState([]);
  //useEffect for fetch the data from firestore
  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshort => {
      setPosts(snapshort.docs.map(doc => ({ id: doc.id, post: doc.data() })))
    })
  }, [])


  useEffect(() => {
    //after referece the page state will change but this function make your state stable.
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //when user is logged in...
        console.log(authUser);
        setUser(authUser);//this is when user log in and it's referece the page 
      } else {
        //when user is logged out...
        setUser(null);
      }
    })
  }, [user, username])

  //function to handle signUp
  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) =>alert(error.message));
      
      

    setOpen(false);
  }
  //function to handle login.
  const logIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }
  return (
    <div className="">
    <div className="header">

      <img src={Logo} className="header__logo" />
      <div className="header__modal">
        <Modal
          open={open}
          onClose={() => setOpen(false)}
        >
          <div style={modalStyle} className={classes.paper}>
            <div className="">
              <form className="header__signUp">

                <img src={Logo} className="header__logo" className="header__logo" />

                <TextField type="text" value={username} label="username" onChange={(e) => setUsername(e.target.value)} />
                <TextField type="email" value={email} label="email" onChange={(e) => setEmail(e.target.value)} />
                <TextField type="password" value={password} label="password" onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit" onClick={signUp} >SingUp</Button>
              </form>
            </div>
          </div>
        </Modal>
        {/* for login */}
        <Modal
          open={openSignIn}
          onClose={() => setOpenSignIn(false)}
        >
          <div style={modalStyle} className={classes.paper}>
            <div className="">
              <form className="header__signUp">

                <img src={Logo} className="header__logo" className="header__logo" />


                <TextField type="email" value={email} label="email" onChange={(e) => setEmail(e.target.value)} />
                <TextField type="password" value={password} label="password" onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit" onClick={logIn} >LogIn</Button>

              </form>
            </div>
          </div>
        </Modal>
      </div>
      {user ? (
        <>

          < Button onClick={() => auth.signOut()} >LogOut</Button>
        </>
      ) : (
        <div className="header__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Login</Button>
          <Button onClick={() => setOpen(true)}>SingUp</Button>
        </div>
      )
      }
      <div className="header__showuploadFile">
        {/* for file upload. */}
        {
          user?.displayName ? (
            <ImageUploade username={user.displayName} />

          ) : (
            <h3 style={{color: "red"}}>Please LogIn for Comment and Upload the File.</h3>
          )
        }
        {/* end of file upload. */}
      </div>
      </div>

      <Grid container spacing={0}>
      <Grid item xs={12} lg={4} >
          {/* for profile details of user. */}
          
            <ProfileDetail user={user} />
        </Grid>
        <Grid item xs={12} lg={8} >
          {/* to display the post */}
<div className="header__post">

{
  posts.map(({ id, post }) => (
    <Post key={id} user={user} postId={id} username={post.username} imageUrl={post.imageUrl} caption={post.caption} />
  ))
}
</div>
        </Grid>



</Grid>
    </div >


  )
}

export default Header;
