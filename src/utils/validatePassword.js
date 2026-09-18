const validatePassword = (password) => {

    let passwordValue = password.trim();

    if (passwordValue.length < 8 || passwordValue.length > 64) passwordValue = false;

    if (/\s/.test(password)) passwordValue = false;

    if (!/[A-Z]/.test(passwordValue)) passwordValue = false;

    if (!/[a-z]/.test(passwordValue)) passwordValue = false;

    if (!/[0-9]/.test(passwordValue)) passwordValue = false;

    if (!/[^A-Za-z0-9]/.test(password)) passwordValue = false;

    if (!passwordValue) {
        throw new Error("Invalid password");
    }

    return password;
};

export default validatePassword