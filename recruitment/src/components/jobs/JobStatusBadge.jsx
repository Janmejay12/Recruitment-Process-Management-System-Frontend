const colors = {
  Open: "bg-green-100 text-green-700",
  OnHold: "bg-yellow-100 text-yellow-700",
  Closed: "bg-red-100 text-red-700"
};

const JobStatusBadge = ({ status }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}
  >
    {status}
  </span>
);

export default JobStatusBadge;
