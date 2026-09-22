const validateText = (text) => {
    const clearText = text.trim();

    if (!clearText || clearText.length > 500) {
        throw new Error("Invalid text");
    }

    if (/<[^>]*>/.test(clearText)) {
        throw new Error("Invalid text");
    }

    return text;
};

export default validateText;