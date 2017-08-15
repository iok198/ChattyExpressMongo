export default function(token) {
    return fetch("/user/verify", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
    })
    .then(r => r.json())
    .then(result => result.authorized)
}
