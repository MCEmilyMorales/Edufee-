import React from "react";

const pendingInstitutions = [
  { id: 1, name: "Pending Institution A" },
  { id: 2, name: "Pending Institution B" },
  // Add more sample data here
];

const PendingInstitutions: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <ul>
        {pendingInstitutions.map((institution) => (
          <li
            key={institution.id}
            className="border-b py-2 flex justify-between items-center"
          >
            <span>{institution.name}</span>
            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300">
              Approve
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingInstitutions;
