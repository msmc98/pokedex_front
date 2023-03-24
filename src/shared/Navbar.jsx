import { NavLink } from "react-router-dom";
import routes from "../routes/routes";
import photo from './../static/imgs/pokedex.webp'
import './../static/css/navbar.css'
import { useState } from "react";

const Navbar = () => {

  const [opened, setOpened ] = useState(false)
 
  const handleLogout = (e) => {
    localStorage.clear();
    return window.location.href = "/";
  };

  const renderLogo = () =>{
    return (
      <div style={{width: "60px", }}>
        <img style={{width: "60px", }} src={photo} alt="pokedex" />
      </div>
    )
  }

  const toggleBurger = () => {
    setOpened(!opened)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      {/* <div className="navbar-brand">
        <Link to="/">
          Login
        </Link>
      </div> */}
      {!opened && <button
        style={{zIndex: '99', backgroundColor: '#343a40', color: '#000'}}
        className="navbar-toggler"
        type="button"
        onClick={toggleBurger}
      >
        <span className="navbar-toggler-icon"></span>
      </button>}

      {opened && <><button
        style={{zIndex: '99', backgroundColor: '#343a40', color: '#000'}}
        className="navbar-toggler"
        type="button"
        onClick={toggleBurger}>
          
        <span className="navbar-toggler-icon"></span>
        {routes && routes.length !== 0 ? (
            routes.map((route) => {
              if (route.visible) {
                return (
                  <NavLink
                    key={route.path + route.name}
                    to={route.path}
                    className="nav-item"
                    style={{color: 'rgb(154 157 160)'}}
                  >
                    <span className="nav-link">{route.name !== 'Pokedex' ? route.name : renderLogo()}</span>
                  </NavLink>
                );
              }
              return "";
            })
          ) : (
            ''
          )}
      </button>
      </>
      }

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          {routes && routes.length !== 0 ? (
            routes.map((route) => {
              if (route.visible) {
                return (
                  <NavLink
                    key={route.path + route.name}
                    to={route.path}
                    className="nav-item"
                  >
                    <span className="nav-link">{route.name !== 'Pokedex' ? route.name : renderLogo()}</span>
                  </NavLink>
                );
              }
              return "";
            })
          ) : (
            <h1>No routes</h1>
          )}
        </ul>
      </div>
      <div className="navbar-brand">
        <div className="nav-item" style={{"cursor":"pointer",color: 'rgb(154 157 160)'}} onClick={handleLogout}>
          Logout
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
