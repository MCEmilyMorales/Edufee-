import React from "react";
import Image from "next/image";
interface User {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  foto: string;
}

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className="border-b py-4 flex items-center space-x-4"
          >
            <Image
              src={user.foto}
              alt={`${user.nombre} Foto`}
              className="w-16 h-16 object-cover rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">
                {user.nombre} {user.apellido}
              </h3>
              <p>
                <strong>DNI:</strong> {user.dni}
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
