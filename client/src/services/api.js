export const API_URL = '/api';

const jsonRequest = async (path, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || 'Une erreur est survenue.');
  }

  return payload;
};

export const loginUser = (credentials) => jsonRequest('/login', {
  method: 'POST',
  body: JSON.stringify(credentials),
});

export const addEquipment = (equipmentData) => jsonRequest('/equipments', {
  method: 'POST',
  body: JSON.stringify(equipmentData),
});

export const createLoan = (loanData) => jsonRequest('/loans', {
  method: 'POST',
  body: JSON.stringify(loanData),
});

export const updateLoanStatus = (loanId, newStatus) => jsonRequest(`/loans/${loanId}/status`, {
  method: 'PATCH',
  body: JSON.stringify({ status: newStatus }),
});

export const deleteEquipment = async (equipmentId) => {
  const token = localStorage.getItem('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await fetch(`${API_URL}/equipments/${equipmentId}`, {
    method: 'DELETE',
    headers,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || 'Impossible de retirer cet equipement.');
  }

  return payload;
};
