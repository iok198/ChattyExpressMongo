import verifyToken from "./verifyToken"

export default function requireAuth (nextState, replace, callback) {
  const token = localStorage.getItem("token")
  if (!token) replace("/signin")

  verifyToken(token)
    .then(isAuth => {
      console.log("Auth: " + isAuth)

      if (!isAuth) {
        console.log("Should redirect to login")
        localStorage.removeItem("token")
        replace("/signin")
      }
    })

  callback()
}
