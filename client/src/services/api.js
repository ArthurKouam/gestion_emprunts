export const API_URL = "/api";

// Authentification
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return await response.json();
};

// Ajouter un équipement
export const addEquipment = async (equipmentData) => {
  const response = await fetch(`${API_URL}/equipments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(equipmentData),
  });

  return await response.json();
};

// Créer une demande d'emprunt
export const createLoan = async (loanData) => {
  const response = await fetch(`${API_URL}/loans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loanData),
  });

  return await response.json();
};

// Modifier le statut d'une demande
export const updateLoanStatus = async (loanId, newStatus) => {
  const response = await fetch(`${API_URL}/loans/${loanId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: newStatus,
    }),
  });

  return await response.json();
};
