import apiUrl from '../config.js'

export default {
    login: user => {
        return fetch(`${apiUrl}/users/login`, {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => data);
    },
    register: user => {
        return fetch(`${apiUrl}/users/register`, {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => data);
    },
    logout: () => {
        return fetch(`${apiUrl}/users/logout`)
            .then(response => response.json())
            .then(data => data);
    },
    isAuthenticated: () => {
        return fetch(`${apiUrl}/users/authenticated`)
            .then(response => {
                if (response.status !== 401) {//401 because passport by default return 401 status if user is not authorized
                    return response.json().then(data => data);
                } else {
                    return { isAuthenticated: false, user: { username: "", role: "" }};
                }
            })
    }
}