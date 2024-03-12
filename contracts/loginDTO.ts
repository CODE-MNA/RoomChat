
//Add validations if possible by changing the type to something else
export type LoginRequest = {
    email: string,
    password: string
}

export type LoginResponse = {
    token: string
}