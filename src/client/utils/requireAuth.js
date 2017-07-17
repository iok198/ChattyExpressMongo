export default function requireAuth (nextState, replace, callback) {
  const token = localStorage.getItem("token")
  if (!token) replace('/signin')
  callback()
}
