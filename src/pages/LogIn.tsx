import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthCredential, GithubAuthProvider } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../firebaseConfig'
import swal from 'sweetalert'
import './styles/loginStyle.css'
import { useDispatch, useSelector } from 'react-redux'
import { stateType } from '../state/Store'
import { logInInReducer } from '../state/loggedInSlice'
import { useNavigate } from 'react-router-dom'


function LogIn() {
  const providerGoogleAuth = new GoogleAuthProvider();
  const providerGitHubAuth = new GithubAuthProvider();
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const { user } = useSelector((state: stateType) => state.logged)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logInForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (userName && password) {
      signInWithEmailAndPassword(auth, userName, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(logInInReducer(user))
          swal({
            title: 'Logged in',
            text: 'Welcome!',
            icon: 'success'
          })
          navigate("/products")
        })
        .catch((error) => {
          swal({
            title: 'Error logging in!',
            text: 'Please check your credentials',
            icon: 'error'
          })
        });

      setPassword('')
      setUserName('')
    }
  }

  const signInWithGoogleButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    signInWithPopup(auth, providerGoogleAuth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);

        const token = credential!.accessToken;
        const user = result.user;

        dispatch(logInInReducer(user))
        swal({
          title: 'Logged in',
          text: 'Welcome!',
          icon: 'success'
        })
        navigate("/products")
      }).catch((error) => {
        swal({
          title: 'Error logging in!',
          text: 'Please check your credentials',
          icon: 'error'
        })
      });
  }

  const signInWithGitHub = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    signInWithPopup(auth, providerGitHubAuth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential: OAuthCredential | null = GithubAuthProvider.credentialFromResult(result);

        const token = credential!.accessToken;
        const user = result.user;

        dispatch(logInInReducer(user))
        swal({
          title: 'Logged in',
          text: 'Welcome!',
          icon: 'success'
        })
        navigate("/products")
      }).catch((error) => {
        console.log(error);
        
        swal({
          title: 'Error logging in!',
          text: 'Please check your credentials',
          icon: 'error'
        })
      });
  }


  return (
    <div className='logging-container'>
      <div className='elements'>
        <h1>Log In</h1>
        <form>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={logInForm}>Submit</button>
          <h4>Log In with: </h4>
          <div className='alternative-buttons'>
            Google
            <button className='button-google' onClick={signInWithGoogleButton}><img className='google-img' src="/src/assets/google.png" /></button>
            GitHub
            <button className='button-google' onClick={signInWithGitHub}><img className='google-img' src="/src/assets/github.png" /></button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LogIn