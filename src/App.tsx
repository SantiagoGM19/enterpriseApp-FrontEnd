import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Bills from "./pages/Bills/Bills"
import MainPage from "./pages/MainPage"
import Products from "./pages/Products/Products"
import Providers from "./pages/Providers/Providers"
import ReceiptForm from "./pages/Receipts/ReceiptForm"
import Receipts from "./pages/Receipts/Receipts"

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div>
          <Link className="navbar-brand" to="/">
            <img src="/src/assets/user.png" width="30" height="30" className="d-inline-block align-top" alt="" />
          </Link>
        </div>
        <div className="collapse navbar-collapse">
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
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/products" element={<Products />}/>
        <Route path="/providers" element={<Providers />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/receipts" element={<Receipts />} />
        <Route path="/bills/form" />
        <Route path="/receipts/form" element={<ReceiptForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
