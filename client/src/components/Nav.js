import {Link} from 'react-router-dom';

export default function Nav() {
  const navToggle = () => {
    const nav = document.querySelector(".nav-links");
    nav.classList.toggle("nav-active");
  }

  const login = () => {
  };
  const logout = () => {
    localStorage.clear();
    window.location.href=process.env.BASE_URL + 'login';
  };

  return (
    <header className="App-header">
        <nav>
          <ul className="nav-links">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link style={{display: localStorage.getItem("isLogged") ? '' : 'none'}} to="/profile">
              <li>Profile</li>
            </Link>
            <Link to="/namecards">
              <li>Namecards</li>
            </Link>
            <Link to="/about">
              <li>About</li>
            </Link>
          </ul>
          <div className="hamburger" onClick={navToggle}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <div className="logo">
            My Page
          </div>
            {localStorage.getItem('isLogged') ?
            <div className="logout" onClick={logout} >
              <Link to="/" style={{color: 'white'}}>
                Logout
              </Link>
            </div>
            :
            <div className="login" onClick={login}>
              <Link to="/login" style={{color: 'white'}}>
                Login
              </Link>
            </div>
          }
      </nav>
    </header>
  );
};
  