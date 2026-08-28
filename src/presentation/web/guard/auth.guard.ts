const SESSION_KEY = "bobby_auth";
const CREDENTIALS = {
    username: "admin",
    password: "admin123"
}

export class AuthGuard {
    login(username: string, password: string): boolean {
        const ok = username === CREDENTIALS.username
                && password === CREDENTIALS.password;
        if (ok) sessionStorage.setItem(SESSION_KEY, JSON.stringify({
            username,
            email: "juanrios@gmail.com",
            avatar: "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
        }));
        return ok;
    }

    logout(): void {
        sessionStorage.removeItem(SESSION_KEY);
    }

    isAuthenticated(): boolean {
        return sessionStorage.getItem(SESSION_KEY) !== null;
    }

    getCurrentUser() {
        const sessionData = sessionStorage.getItem(SESSION_KEY);
        return sessionData ? JSON.parse(sessionData) : null;
    }
}
