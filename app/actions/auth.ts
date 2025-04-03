import http from "@/app/actions/http"

export async function signIn({ name, password }) {
    return await http.login(name, password)
}