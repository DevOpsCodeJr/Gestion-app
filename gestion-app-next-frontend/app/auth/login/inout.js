export const login = async (form, setAuth) => {
    try {
        const response = await fetch('http://localhost:8080/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        const data = await response.json()

        if (response.status === 200) {
            const token = response.headers.get('token')
            console.log(token)
            const tokenValue = token && token.split(';')[0].split('=')[1]
            localStorage.setItem('token', tokenValue)
            localStorage.setItem('user', JSON.stringify(data.user))

            setAuth(data.user)
        }

        return response.status
    } catch (error) {
        throw new Error(error)
    }
}

export const logout = async (setAuth, router) => {
    useEffect(() => {
        localStorage.clear();
        setAuth({});
        router.push('/auth/login');
    });
    return <h1>Cerrando Sesion...</h1>;
}