import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="mb-6 flex gap-3">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `rounded-lg px-4 py-2 border ${
            isActive
              ? "bg-black text-white"
              : "bg-white"
          }`
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/analytics"
        className={({ isActive }) =>
          `rounded-lg px-4 py-2 border ${
            isActive
              ? "bg-black text-white"
              : "bg-white"
          }`
        }
      >
        Analytics
      </NavLink>
    </div>
  );
}