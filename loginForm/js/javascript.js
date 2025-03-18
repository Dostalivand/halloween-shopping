document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("logemail");
    const passwordInput = document.getElementById("logpass");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        checkInput(emailInput, "ایمیل را وارد کنید!");
        checkInput(passwordInput, "رمز عبور را وارد کنید!");
    });

    function checkInput(input, message) {
        let existingWarning = input.parentElement.querySelector(".warning");
        if (existingWarning) {
            existingWarning.remove();
        }

        if (!input.value.length) {
            let warning = document.createElement("span");
            warning.classList.add("warning");
            warning.innerText = message;
            input.parentElement.style.position = "relative";
            input.parentElement.appendChild(warning);
        }
    }
});
