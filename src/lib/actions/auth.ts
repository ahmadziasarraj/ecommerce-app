"use server"
import {signIn, signOut} from "../../auth"
export const logIn = async ()=> {
    await signIn('github', {redirectTo:'/dashboard'});
}

export const logOut = async() => {
    await signOut({redirectTo:'/'});
}