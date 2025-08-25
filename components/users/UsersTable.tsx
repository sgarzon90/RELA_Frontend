import { Trash2, Edit } from 'lucide-react';

interface UsersTableProps {
  users: any[];
  onEdit: (user: any) => void;
  onDelete: (id: number) => void;
}

export default function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <h2 className="text-xl font-semibold p-6">Usuarios</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600">
              <th className="py-3 px-6 font-medium">ID</th>
              <th className="py-3 px-6 font-medium">Email</th>
              <th className="py-3 px-6 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">{u.id}</td>
                <td className="py-4 px-6">{u.email}</td>
                <td className="py-4 px-6 flex gap-4">
                  <button
                    onClick={() => onEdit(u)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(u.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
