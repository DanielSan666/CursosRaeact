const IP = '192.168.1.226';

export const login = async (email, password) => {
    try {
        const response = await fetch(`http://${IP}:5000/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include', // Asegura que las credenciales se envíen con la solicitud si es necesario
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            console.error("Login error: Unexpected status", response.status);
            return false;
        }
    } catch (error) {
        console.error("Login error:", error);
        return false; // Asegúrate de devolver false en caso de error
    }
};

export const logout = async () => {
    try {
        const response = await fetch(`http://${IP}:5000/api/logout`, {
            method: 'POST',
            credentials: 'include', // Asegura que las credenciales se envíen con la solicitud si es necesario
        });

        if (response.ok) {
            return true;
        } else {
            console.error("Logout error: Unexpected status", response.status);
            return false;
        }
    } catch (error) {
        console.error("Logout error:", error);
        return false; // Asegúrate de devolver false en caso de error
    }
};

export const register = async (username, email, password) => {
    try {
        const response = await fetch(`http://${IP}:5000/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            return true;
        } else {
            console.error("Register error: Unexpected status", response.status);
            return false;
        }
    } catch (error) {
        console.error("Register error:", error);
        return false; // Asegúrate de devolver false en caso de error
    }
};
