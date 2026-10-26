import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { UserService } from "../services/ServiceForTheUser";
import type { User, UserData } from "../types/User";

interface Props {
    userId: number | null;
    users: User[];
    onSave: (user: User) => void;
    onBack: () => void;
}

const emptyUser: UserData = {
    firstName: "",
    lastName: "",
    age: 18,
    email: "",
    phone: "",
    username: ""
};

export function UserForm({ userId, users, onSave, onBack }: Props) {
    const [user, setUser] = useState<UserData>({ ...emptyUser });
    const [error, setError] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setError("");

        if (userId === null) {
            setUser({ ...emptyUser });
        } else {
            const existingUser = users.find(item => item.id === userId);

            if (existingUser) {
                const { id, ...userData } = existingUser;
                setUser(userData);
            }
        }
    }, [userId, users]);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setUser(prev => ({
            ...prev,
            [name]: name === "age" ? Number(value) : value
        }));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setIsSaving(true);

        try {
            let savedUser: User;

            if (userId === null) {
                await UserService.create(user);

                const newId = Math.max(0, ...users.map(item => item.id)) + 1;

                savedUser = {
                    ...user,
                    id: newId
                };
            } else {
                await UserService.update(userId, user);

                savedUser = {
                    ...user,
                    id: userId
                };
            }

            onSave(savedUser);
        } catch {
            setError("Failed to save user. Please try again.");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div>
            <h2>{userId === null ? "Create User" : "Edit User"}</h2>

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    name="firstName"
                    placeholder="First Name"
                    value={user.firstName}
                    onChange={handleChange}
                    required
                />

                <input
                    name="lastName"
                    placeholder="Last Name"
                    value={user.lastName}
                    onChange={handleChange}
                    required
                />

                <input
                    name="age"
                    type="number"
                    placeholder="Age"
                    value={user.age}
                    onChange={handleChange}
                    min="1"
                    required
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />

                <input
                    name="phone"
                    placeholder="Phone"
                    value={user.phone}
                    onChange={handleChange}
                    required
                />

                <input
                    name="username"
                    placeholder="Username"
                    value={user.username}
                    onChange={handleChange}
                    required
                />

                <div>
                    <button type="submit" disabled={isSaving}>
                        {isSaving
                            ? "Saving..."
                            : userId === null
                                ? "Create"
                                : "Update"}
                    </button>

                    <button type="button" onClick={onBack} disabled={isSaving}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
