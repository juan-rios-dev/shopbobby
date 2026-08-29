import { AuthGuard } from "../guard/auth.guard";

export class LoginSection {
    constructor(
        private auth: AuthGuard,
        private onSuccess: () => void
    ) {}

    setup(): void {
        const form = document.getElementById("login-form") as HTMLFormElement;
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const email = document.getElementById("email") as HTMLInputElement;
            const password = document.getElementById("password") as HTMLInputElement;

            const success = this.auth.login(
                email.value,
                password.value
            )

            if(!success) {
                alert("Credenciales incorrectas");
            } else {
                this.onSuccess();
            }
        })
    }
}
