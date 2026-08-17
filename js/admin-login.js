// ==========================================
// FIXFLOW ADMIN LOGIN
// ==========================================

document.addEventListener("DOMContentLoaded", function () {


    // ==========================================
    // GET ELEMENTS
    // ==========================================

    const loginForm =
        document.getElementById("adminLoginForm");

    const emailInput =
        document.getElementById("adminEmail");

    const passwordInput =
        document.getElementById("adminPassword");

    const loginError =
        document.getElementById("loginError");


    // ==========================================
    // CHECK FORM
    // ==========================================

    if (!loginForm) {

        console.error(
            "ERROR: adminLoginForm not found."
        );

        return;

    }


    // ==========================================
    // LOGIN SUBMIT
    // ==========================================

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // Get values

            const email =
                emailInput.value
                    .trim()
                    .toLowerCase();

            const password =
                passwordInput.value;


            // Clear old error

            loginError.textContent = "";


            // ==========================================
            // ADMIN CREDENTIALS
            // ==========================================

            const correctEmail =
                "admin@fixflow.com";

            const correctPassword =
                "FixFlow@123";


            // ==========================================
            // CHECK LOGIN
            // ==========================================

            if (
                email === correctEmail &&
                password === correctPassword
            ) {


                // ======================================
                // SAVE LOGIN
                // ======================================

                sessionStorage.setItem(
                    "fixflowAdminLoggedIn",
                    "true"
                );

                localStorage.setItem(
                    "fixflowAdminLoggedIn",
                    "true"
                );

                localStorage.setItem(
                    "adminLoggedIn",
                    "true"
                );


                // ======================================
                // SUCCESS
                // ======================================

                loginError.textContent =
                    "";


                // Go to admin dashboard

                window.location.replace(
                    "admin-dashboard.html"
                );

            }

            else {


                // ======================================
                // WRONG CREDENTIALS
                // ======================================

                loginError.textContent =
                    "Invalid email or password.";


                passwordInput.value = "";

                passwordInput.focus();

            }

        }
    );

});