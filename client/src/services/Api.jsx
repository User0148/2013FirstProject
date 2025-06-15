import axios from "axios";

const API_BASE_URL = "https://api-adresse.data.gouv.fr";

export function autocompleteCity(value) {
  return axios.get(
    `${API_BASE_URL}/search/?q=${value}&type=municipality&autocomplete=1`,
  );
}

