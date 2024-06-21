import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "./../../assets/Frame 4.png"

function NavBar() {
  return (
    <div className="nav-container">
      <img src={logo} />
      <nav className="nav-center">
        <Link to="/">Artworks</Link>
        <Link to="/favourites">Favourites</Link>
        <Link to="/ai-mpressionist">AI-mpressionist</Link>
      </nav>
    </div>
  );
}
export default NavBar;
