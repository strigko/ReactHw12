export interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    phone: string;
    username: string;
}

export type UserData = Omit<User, "id">;