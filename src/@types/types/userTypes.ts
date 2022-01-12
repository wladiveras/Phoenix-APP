export interface IUser {
    id: string
    name: string
    email: string
    createdAt: string
    updatedAt: string
    role: string
    exceptions: []
    permissions: []
}
