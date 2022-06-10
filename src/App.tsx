import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div>
          <a className="navbar-brand" href="#">
            <img src="/src/assets/user.png" width="30" height="30" className="d-inline-block align-top" alt="" />
          </a>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="#">Products</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="#">Providers</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="#">Bills</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="#">Receipts</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" />
        <Route path="/products" />
        <Route path="/providers" />
        <Route path="/bills" />
        <Route path="/receipts" />
        <Route path="/products/form" />
        <Route path="/providers/form" />
        <Route path="/bills/form" />
        <Route path="/receipts/form" />
      </Routes>
    </BrowserRouter>
  )
}

export default App
