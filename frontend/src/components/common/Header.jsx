import React, { useEffect, useState } from "react";
import { NavbarLinks } from "../../data/navbar-links";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { Link, matchPath } from "react-router-dom";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/HomePage/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";

function Header() {
  const Location = useLocation();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [subLinks, setSubLinks] = useState([]);

  const matchingRoute = (route) => {
    if (!route) return false;
    return matchPath({ path: route }, Location.pathname);
  };

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Priting subLinks result: ",result.data.allCategory);
      setSubLinks(result.data.allCategory);
    } catch (err) {
      console.log("Error while fetching categories API: ", err);
    }
  };
  useEffect(() => {
    fetchSubLinks();
  }, []);

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
          <ul className="flex text-richblack-25 gap-6 cursor-pointer">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                   <div className="relative flex gap-0.5 items-center group z-50">
                      <p>{link.title}</p>

                      {/* using showAllCategories API */}
                      <ChevronDown className="text-[14px]" />
                      <div className="invisible absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[10%] bg-richblack-5 text-richblack-800 flex flex-col rounded-md p-4 opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 lg:w-[150px] z-50">
                        <div className="absolute left-[51%] top-0 translate-x-[55%] translate-y-[-41%] rotate-45 h-6 w-6 bg-richblack-5"> 
                        </div>
                        {
                          subLinks.length ? (
                            subLinks.map((sublink,index) => {
                              return <Link to={`catalog/${sublink.name}`} key={index} className="hover:bg-richblack-50 py-2 px-2 rounded-md">
                                <p>
                                 {sublink.name}
                                </p>
                              </Link>
                            })
                          ) : (<div></div>)
                        }
                      </div>
                    </div>
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

        {/* login-signup-dashboard */}

        {/* <div className="flex gap-x-4 items-center">
          {user && user?.accountType == "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <ShoppingCart />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 text-richblack-300 rounded-s-xl px-3 py-2">
                Log In
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 text-richblack-200 rounded-s-xl px-3 py-2">
                Sign up
              </button>
            </Link>
          )}

          {token != null && <ProfileDropDown />}
        </div> */}
            <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
}

export default Header;
