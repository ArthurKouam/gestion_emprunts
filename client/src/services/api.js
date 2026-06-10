const API_URL = "http://localhost:5000/api";

// Lire les équipements
export const getEquipments = async () => {
  const response = await fetch(`${API_URL}/equipments`);
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

// Lire les demandes
export const getLoans = async () => {
  const response = await fetch(`${API_URL}/loans`);
  return await response.json();
};

// Modifier le statut d'une demande
export const updateLoanStatus = async (
  loanId,
  newStatus
) => {
  const response = await fetch(
    `${API_URL}/loans/${loanId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    }
  );

  return await response.json();
};