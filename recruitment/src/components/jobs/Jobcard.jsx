import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <Link
      to={`/jobs/${job.jobId}`}
      className="bg-white rounded-lg border p-5 hover:shadow transition block"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800">
          {job.title}
        </h3>

        <span
          className={`text-xs px-2 py-1 rounded
            ${job.status === "Open" && "bg-green-100 text-green-700"}
            ${job.status === "OnHold" && "bg-yellow-100 text-yellow-700"}
            ${job.status === "Closed" && "bg-red-100 text-red-700"}
          `}
        >
          {job.status}
        </span>
      </div>

      <p className="text-sm text-gray-500 mt-1">
        {job.department} • {job.location}
      </p>

      <div className="mt-3 text-sm text-gray-600">
        Level: {job.level}
      </div>
    </Link>
  );
};

export default JobCard;
