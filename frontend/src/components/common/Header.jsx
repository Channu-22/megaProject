import React from "react";
import { NavbarLinks } from "../../data/navbar-links";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Header() {
  const Location = useLocation();
  return (
    <div>
      <div className="w-11/12 flex items-center justify-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="" />
        </Link>

        <nav>
          <ul className="flex justify-center items-center">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link === "Catalog" ? (
                    <div></div>
                  ) : (
                    <Link to={link?.path}>
                      <p>{link.title}</p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
