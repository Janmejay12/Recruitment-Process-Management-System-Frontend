import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { logout, hasRole } = useAuth();

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        

        {/* Left */}
        <div className="flex items-center gap-8">
          <span className="text-xl font-semibold text-blue-600">
            Recruitment System
          </span>

          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
            Dashboard
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {hasRole("Admin") && (
            <Link
              to="/register-user"
              className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
            >
              + Register User
            </Link>
          )}

          <button
            onClick={logout}
            className="text-red-500 hover:text-red-600 font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
