import { useDispatch, useSelector } from "react-redux";
import { Home, Star, BookmarkCheck, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { logOutUser } from "../customsApi";
import { signOut } from "../redux/authSlice";

const links = [
  {
    name: "Home",
    icon: <Home />,
    path: ".",
  },
  {
    name: "Important",
    icon: <Star />,
    path: "important",
  },
  {
    name: "Complete",
    icon: <BookmarkCheck />,
    path: "complete",
  },
];

export default function SideBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      const { success, message } = await logOutUser();
      if (success) {
        dispatch(signOut());
        localStorage.removeItem("token");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="hidden sm:block max-w-52 w-full border m-1 rounded-md bg-[#d48f8a] fixed bottom-1 top-20 ">
      <div className="h-full py-2 flex flex-col items-center justify-between">
        {/*first users  */}
        <div className="border-b w-full flex flex-col items-center ">
          <img src={user.profile || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb51ZwKCKqU4ZrB9cfaUNclbeRiC-V-KZsfQ&s"} className="w-14 h-14 object-cover rounded-full" alt="profile" />
          <p className="text-center text-xl font-semibold text-slate-700 ">
            {user.name}
          </p>
        </div>

        {/* second navigation */}
        <div>
          {links.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              end
              className={({ isActive }) =>
                `${isActive ? "text-black" : "text-white"}`
              }
            >
              <div className="flex items-center gap-4 py-4">
                <p> {item.icon}</p>
                <p>{item.name}</p>
              </div>
            </NavLink>
          ))}
        </div>
        {/* third logout */}

        <div>
          <button
            className="bg-red-700 px-12 py-2 text-white hover:bg-red-800 rounded-md"
            onClick={handleLogout}
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
}
