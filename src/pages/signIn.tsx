import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../firebaseConfig'
import './styles/loginStyle.css'
import swal from 'sweetalert'

function SignIn() {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')


  const signInForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (password && userName) {
      createUserWithEmailAndPassword(auth, userName, password)
        .then((userCredential) => {
          const user = userCredential.user;
          swal({
            title: 'Signed in',
            text: 'Done! now you can log in',
            icon: 'success'
          })
        })
        .catch((error) => {
          swal({
            title: 'Error!',
            text: 'It is possible that the username already exists, try another one',
            icon: 'error'
          })
        });

      setUserName('')
      setPassword('')
    }
  }

  return (
    <div className='logging-container'>
      <div className='elements'>
        <h1>Sign In</h1>
        <form>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={signInForm}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default SignIn