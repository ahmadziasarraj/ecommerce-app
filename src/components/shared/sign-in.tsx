"use client"
import { logIn } from "@/lib/actions/auth"

export default function SignIn() {
    return (
        <button onClick={() => logIn()}>Signin with GitHub</button>
    )
} 