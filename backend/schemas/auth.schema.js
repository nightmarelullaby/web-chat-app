import { z } from "zod"

export const registerSchema = z.object({
    username: z.string({
        required_error: "username is required"
    }),
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Email is invalid"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(4, {
        message: "password is too short"
    }),
    passwordConfirmation: z.string({
        required_error: "Password is required"
    }).min(4, {
        message: "password is too short"
    }).refine((ctx) => ctx.password === ctx.passwordConfirmation, {
        message:"passwords don't match",
        path:["passwordConfirmation"]
    })
})

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Email is invalid"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(4, {
        message: "password is too short"
    })
})
