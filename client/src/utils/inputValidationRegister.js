export const validateForm = (formData) => {
    const errors = {};
  
    // Vérifier la longueur du nom
    if (formData.name.trim().length > 20) {
      errors.name = "Le nom du club ne doit pas dépasser 20 caractères.";
    }
  
    // Vérifier si c'est un email valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.trim() !== "" && !emailRegex.test(formData.email)) {
      errors.email = "Veuillez entrer une adresse email valide.";
    }
  
    // Vérifier la longueur de la description
    if (formData.description.trim() !== "" && formData.description.length > 200) {
      errors.description = "La description ne doit pas dépasser 200 caractères.";
    }
  
    // Vérifier si l'effectif est négatif
    if (formData.effectif < 0) {
      errors.effectif = "L'effectif ne peut pas être négatif.";
    }
  
    // Vérifier la longueur du numéro de téléphone
    const phoneRegex = /^\d{10}$/;
    if (formData.phone.trim() !== "" && !phoneRegex.test(formData.phone)) {
      errors.phone = "Le numéro de téléphone doit contenir 10 chiffres.";
    }
  
    return errors;
  };

