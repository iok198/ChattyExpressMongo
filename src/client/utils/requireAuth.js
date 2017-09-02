import verifyToken from "./verifyToken"
import UserStore from "../stores/user.store"

export default async function requireAuth(nextState, replace, callback) {
  const token = localStorage.getItem("token")
  if (!token) replace("/signin")

  let isAuth = await verifyToken(token)
  console.log("Auth: " + isAuth)

  if (!isAuth) {
    console.log("Should redirect to login")
    localStorage.removeItem("token")
    replace("/signin")
  }

  callback()
}
