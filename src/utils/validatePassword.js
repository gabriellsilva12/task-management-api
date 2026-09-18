const validatePassword = (password) => {

    const validatePassword = password.trim()

    if (validatePassword.length < 8 || validatePassword.length > 64) return false; 

    if (!/[A-Z]/.test(password)) return false;

    if (!/[a-z]/.test(password)) return false; 

    if (!/[0-9]/.test(password)) return false; 

    if (!/[^A-Za-z0-9]/.test(password)) return false;

    return password;

};

export default validatePassword