import React from "react";
import { NavbarLinks } from "../../data/navbar-links";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Header() {
  const Location = useLocation();

  const matchingRoute = (route) => {
    if (!route) return false;
    return matchPath({ path: route }, Location.pathname);
  };

  return (
    <div className="border-b-[1px] border-b-richblack-700">
      <div className="w-11/12 mx-auto max-w-maxContent flex items-center justify-between px-3 py-2">
      {/* IMAGE LOGO */}
        <Link to="/">
          <img
            src={Logo}
            alt="Logo"
            className="w-[160px] h-[40px] "
            loading="lazy"
          />
        </Link>

        {/* NAVLINK */}
        <nav>
          <ul className="flex text-richblack-25 gap-6">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div></div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={
                          matchingRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }
                      >
                        {link.title}
                      </p>
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
