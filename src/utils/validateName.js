const validateName = (name) => {

    name = name.trim().trim()

    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/.test(name)) return false;

    if (name.length === 0 || name.length > 30) return false;

    return name;
};

export default validateName