import { IUser } from "/@src/@types/types/userTypes"

type state = string

export interface ISession {
    state: Record<string, number>
    user: IUser | null
    token: {
        value: string
        refresh: string
    }
    response: {
        user: IUser
        token: string
        refreshToken: string
    }
}
