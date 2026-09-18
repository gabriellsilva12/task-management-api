const validateName = (name) => {
    const clearName = name.trim()
    
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/.test(clearName)) name = false;
    
    if (clearName.length === 0 || clearName.length > 30) name = false;
    
    if (!name) {
        throw new Error("Invalid name");
    };

    return name;
};

export default validateName