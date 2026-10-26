import { useState } from "react";
import type { User } from "../types/User";
import { UserService } from "../services/ServiceForTheUser";

interface Props {
    users: User[];
    onSelectUser: (id: number) => void;
    onEditUser: (id: number) => void;
    onCreateNew: () => void;
    onDeleteUser: (id: number) => void;
}

export function UserList({
    users,
    onSelectUser,
    onEditUser,
    onCreateNew,
    onDeleteUser
}: Props) {
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState<number | null>(null);

    async function handleDelete(id: number) {
        setError("");
        setDeletingId(id);

        try {
            await UserService.delete(id);
            onDeleteUser(id);
        } catch {
            setError("Failed to delete user");
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div>
            <h2>User List</h2>

            <button onClick={onCreateNew}>
                Create User
            </button>

            {error && <p>{error}</p>}

            <div className="users">
                {users.map(user => (
                    <div className="userCard" key={user.id}>
                        <h3>{user.firstName} {user.lastName}</h3>

                        <p>Email: {user.email}</p>
                        <p>Age: {user.age}</p>

                        <button onClick={() => onSelectUser(user.id)}>
                            View
                        </button>

                        <button onClick={() => onEditUser(user.id)}>
                            Edit
                        </button>

                        <button
                            onClick={() => handleDelete(user.id)}
                            disabled={deletingId !== null}
                        >
                            {deletingId === user.id ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                ))}
            </div>

            {users.length === 0 && <p>No users found.</p>}
        </div>
    );
}
