import React from "react";
import logo from "../../assets/happy.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  BookmarkCheck,
  Home,
  LogIn,
  LogOut,
  Search,
  Star,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { logOutUser } from "../customsApi";
import { signOut } from "../redux/authSlice";


function Header() {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const { success, message } = await logOutUser();

      if (success) {
        dispatch(signOut());
        navigate("/signin");
        localStorage.removeItem("token");
      }
    } catch (err) {
      toast.error("failed to login ");
    }
  }

  return (
    <>
      <Display handleLogout={handleLogout} />
      <Mobile />
    </>
  );
}

const Display = ({ handleLogout }) => {
  const { user } = useSelector((state) => state.auth);


  return (
    <section className="fixed top-0 w-full z-20 bg-black/30 py-1">
      <div className="container flex items-center justify-between">
        {/* first */}
        <div className="flex items-center gap-4">
          <Link to="/home">
            <img src={logo} className="w-16" alt="profile" />
          </Link>
        </div>
        {/* second search */}
          <h1 className="font-semibold font-mono text-2xl text-[#37f59c]">Personal Task Management</h1>
        {/* third  profile*/}
        <Link to="/home">
          <div>
            {user ? (
              <div className="flex items-center gap-4 sm:hidden">
                <img
                  src={user.profile || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb51ZwKCKqU4ZrB9cfaUNclbeRiC-V-KZsfQ&s"}
                  alt="profile"
                  className="w-16 h-16 rounded-full object-cover border border-black/30 p-1"
                />
                <LogOut
                  color="white"
                  className="hover:scale-125"
                  size={"24"}
                  onClick={handleLogout}
                />
              </div>
            ) : (
              <LogIn color="white" className="hover:scale-125" size={"28"} />
            )}
          </div>
        </Link>
      </div>
    </section>
  );
};

const Mobile = () => {

  const link = [
    {
      name: "Home",
      icon: <Home />,
      path: "/home",
    },
    {
      name: "Important",
      icon: <Star />,
      path: "/home/important",
    },
    {
      name: "Complete",
      icon: <BookmarkCheck />,
      path: "/home/complete"
    },
   
  ];

  return (
    <div className="bg-[#d48f8a] py-[5px] fixed bottom-0 w-full sm:hidden">
      <div className="container flex items-center justify-around">
       {
        link.map((item , i)=> (
          <NavLink key={i}
          to={item.path}
          end
          className={({ isActive })=> `flex flex-col items-center  ${isActive ? "text-black" : "text-white"}`}
          >
           <p>{item.icon}</p>
            <p>{item.name}</p>
          </NavLink>
        )
       )}
      </div>
    </div>
  );
};

export default Header;
