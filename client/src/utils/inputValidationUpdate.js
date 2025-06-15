// inputValidation.js

export const validateInputs = (inputs) => {
    const err = {};

    if (inputs.name.length < 3 || inputs.name.length > 25) {
        err.name = "Veuillez saisir un nom valide de 3 à 25 caractères.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (inputs.email.length > 0 && !emailRegex.test(inputs.email)) {
        err.email = "Veuillez saisir une adresse email valide.";
    }

    if (inputs.effectif < 0) {
        err.effectif = "Veuillez saisir un nombre d'effectif valide.";
    }

    if (inputs.phone.length > 0 && !/^\d{10}$/.test(inputs.phone)) {
        err.phone = "Veuillez saisir un numéro de téléphone valide (10 chiffres).";
    }

    return err;
};
