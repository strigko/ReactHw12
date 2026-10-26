import type { User } from "../types/User";

interface Props {
    userId: number;
    users: User[];
    onBack: () => void;
}

export function UserProfile({ userId, users, onBack }: Props) {
    const user = users.find(item => item.id === userId);

    if (!user) {
        return (
            <div>
                <p>User not found.</p>
                <button onClick={onBack}>Back to List</button>
            </div>
        );
    }

    return (
        <div>
            <h2>User Profile</h2>

            <p>Name: {user.firstName} {user.lastName}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Age: {user.age}</p>

            <button onClick={onBack}>Back to List</button>
        </div>
    );
}
