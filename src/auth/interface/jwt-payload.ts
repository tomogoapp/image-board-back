import { uuid } from "uuid"

export interface JwtPayload {
    id: uuid
    email: string,
    username: string,
    is_active:  boolean,
    roles: string[]
}