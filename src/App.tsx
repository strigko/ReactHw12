
import { useEffect, useState } from "react";
import { UserList } from "./components/UserList";
import { UserProfile } from "./components/UserProfile";
import { UserForm } from "./components/UserForm";
import { UserService } from "./services/ServiceForTheUser";
import type { User } from "./types/User";

export function App() {
    const [view, setView] = useState<"list" | "profile" | "form">("list");
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        UserService.getAll()
            .then(setUsers)
            .catch(() => setError("Failed to load users"))
            .finally(() => setIsLoading(false));
    }, []);

    function handleSelectUser(id: number) {
        setSelectedUserId(id);
        setView("profile");
    }

    function handleEditUser(id: number) {
        setSelectedUserId(id);
        setView("form");
    }

    function handleCreateNew() {
        setSelectedUserId(null);
        setView("form");
    }

    function handleSaveUser(user: User) {
        if (selectedUserId === null) {
            setUsers(prev => [...prev, user]);
        } else {
            setUsers(prev =>
                prev.map(item => item.id === user.id ? user : item)
            );
        }

        setSelectedUserId(null);
        setView("list");
    }

    function handleDeleteUser(id: number) {
        setUsers(prev => prev.filter(user => user.id !== id));
    }

    function handleBack() {
        setSelectedUserId(null);
        setView("list");
    }

    if (isLoading) {
        return <p style={{ padding: "20px" }}>Loading users...</p>;
    }

    if (error) {
        return <p style={{ padding: "20px" }}>{error}</p>;
    }

    return (
        <div className="app">
            <h1>User Management</h1>
            <p>Manage users with DummyJSON</p>
            <hr />

            {view === "list" && (
                <UserList
                    users={users}
                    onSelectUser={handleSelectUser}
                    onEditUser={handleEditUser}
                    onCreateNew={handleCreateNew}
                    onDeleteUser={handleDeleteUser}
                />
            )}

            {view === "profile" && selectedUserId !== null && (
                <UserProfile
                    userId={selectedUserId}
                    users={users}
                    onBack={handleBack}
                />
            )}

            {view === "form" && (
                <UserForm
                    userId={selectedUserId}
                    users={users}
                    onSave={handleSaveUser}
                    onBack={handleBack}
                />
            )}
        </div>
    );
}

export default App;
