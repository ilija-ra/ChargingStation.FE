export default {
    login: user => {
        return fetch(`/users/login`, {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status !== 401) {//401 because passport by default return 401 status if user is not authorized
                return response.json().then(data => data);
            } else {
                return { isAuthenticated: false, user: { username: "", role: "" }};
            }
        })
    },
    register: user => {
        return fetch(`/users/register`, {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => data);
    },
    logout: () => {
        return fetch(`/users/logout`)
            .then(response => response.json())
            .then(data => data);
    },
    isAuthenticated: () => {
        return fetch(`/users/authenticated`)
            .then(response => {
                if (response.status !== 401) {//401 because passport by default return 401 status if user is not authorized
                    return response.json().then(data => data);
                } else {
                    return { isAuthenticated: false, user: { username: "", role: "" }};
                }
            })
    }
}