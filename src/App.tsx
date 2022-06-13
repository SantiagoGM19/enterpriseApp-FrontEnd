import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"
import Bills from "./pages/Bills/Bills"
import Products from "./pages/Products/Products"
import Providers from "./pages/Providers/Providers"
import ReceiptForm from "./pages/Receipts/ReceiptForm"
import Receipts from "./pages/Receipts/Receipts"
import LogIn from "./pages/LogIn"
import { useDispatch, useSelector } from "react-redux"
import { stateType } from "./state/Store"
import SignIn from "./pages/signIn"
import { logOutInReducer } from "./state/loggedInSlice"
import swal from 'sweetalert'
import { useState } from "react"


function App() {

  const { user } = useSelector((state: stateType) => state.logged)
  const dispatch = useDispatch()
  const [photoUrl, setPhotoUrl] = useState<string|null>('')

  const logOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    dispatch(logOutInReducer())
    swal({
      title: 'Logged out',
      text: 'Good bye!',
      icon: 'success'
    })
  }

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        {user ?
          <div className="collapse navbar-collapse">
            <div>
              {user["photoURL"] !== null?
                <img src={user["photoURL"]} alt="" />
                :
                <img src="/src/assets/user.png" width="30" height="30" className="d-inline-block align-top" alt="" />
            }
            </div>
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/providers">Providers</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/bills">Bills</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/receipts">Receipts</Link>
              </li>
              <li className="nav-item active">
                <Link to="/logIn">
                  <button type="button" className="btn btn-danger" onClick={logOut}>LogOut</button>
                </Link>
              </li>
            </ul>
          </div>
          :
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/logIn">Log-In</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/signIn">Sign-In</Link>
              </li>
            </ul>
          </div>
        }
      </nav>
      {user ?
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/receipts" element={<Receipts />} />
          <Route path="/bills/form" />
          <Route path="/receipts/form" element={<ReceiptForm />} />
        </Routes>
        :
        <Routes>
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/signIn" element={<SignIn />} />
        </Routes>
      }
    </BrowserRouter>
  )
}

export default App
