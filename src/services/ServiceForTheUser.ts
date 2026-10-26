import type { User, UserData } from "../types/User";

const apiUrl = "https://dummyjson.com/users";

export const UserService = {
    async getAll(): Promise<User[]> {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Failed to load users");
        }

        const data = await response.json();
        return data.users;
    },

    async getById(id: number): Promise<User> {
        const response = await fetch(`${apiUrl}/${id}`);

        if (!response.ok) {
            throw new Error("Failed to load user");
        }

        return response.json();
    },

    async create(user: UserData): Promise<User> {
        const response = await fetch(`${apiUrl}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error("Failed to create user");
        }

        return response.json();
    },

    async update(id: number, user: UserData): Promise<User> {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error("Failed to update user");
        }

        return response.json();
    },

    async delete(id: number): Promise<void> {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete user");
        }
    }
};
