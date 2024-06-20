import { Link } from 'react-router-dom';
import "./Navbar.css";

function NavBar() {
  return (
    <div>
      <nav>
        <Link to="/">Artworks</Link>
        <Link to="/favourites">Favourites</Link>
        <Link to="/ai-mpressionist">AI-mpressionist</Link>
      </nav>
    </div>
  );
}

export default NavBar;
