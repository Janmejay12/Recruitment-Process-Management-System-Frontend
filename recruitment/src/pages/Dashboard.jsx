import Layout from "../components/common/Layout";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, hasRole } = useAuth();

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome back, <span className="font-medium">{user?.fullName}</span>
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       
        <Link
            to="/jobs"
            className="bg-white border rounded-lg p-6 hover:shadow transition block"
            >
            <h3 className="text-lg font-semibold text-gray-800">
                Job Management
            </h3>
            <p className="text-gray-500 mt-1">
                Create, manage, hold or close job postings
            </p>
        </Link>


        <DashboardCard
          title="Candidates"
          description="View and manage candidate profiles"
          color="emerald"
        />

        {hasRole("Admin") && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 flex items-center justify-between">
        <div>
        <h3 className="text-lg font-semibold text-blue-800">
            User Management
        </h3>
        <p className="text-blue-700 text-sm">
            Register recruiters, HR, and other system users.
        </p>
        </div>

        <Link
        to="/register-user"
        className="px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
        >
        Register User
        </Link>
    </div>
    )}

      </div>

      {/* Info Section */}
      <div className="mt-10 bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Overview
        </h2>
        <p className="text-gray-600 leading-relaxed">
          This dashboard provides a centralized view of recruitment operations.
          Access to features depends on your role within the system.
        </p>
      </div>
    </Layout>
  );
};

const colorMap = {
  blue: "from-blue-500 to-blue-600",
  emerald: "from-emerald-500 to-emerald-600",
  violet: "from-violet-500 to-violet-600",
};

const DashboardCard = ({ title, description, color }) => (
  <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-6 cursor-pointer">
    <div
      className={`h-2 w-16 rounded-full bg-gradient-to-r ${colorMap[color]} mb-4`}
    />
    <h3 className="text-xl font-semibold text-gray-800 mb-1">
      {title}
    </h3>
    <p className="text-gray-600 text-sm">
      {description}
    </p>
  </div>
);

export default Dashboard;
