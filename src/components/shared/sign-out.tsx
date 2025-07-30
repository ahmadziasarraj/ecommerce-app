"use client"
import { logOut } from "@/lib/actions/auth"

export default function SignOut() {
    return (
        <button onClick={() => logOut()}>SignOut</button>
    )
} 