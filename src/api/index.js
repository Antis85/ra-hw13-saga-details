const url = process.env.REACT_APP_API_URL_BUILD;

export const getServices = async () => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

export const getServiceDetails = async (serviceId) => {
  const response = await fetch(`${url}/${serviceId}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

export const postService = async (service) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ ...service, id: 0 }),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.ok;
};

export const editService = async (service) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ ...service }),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.ok;
};

export const deleteService = async (serviceId) => {
  const response = await fetch(`${url}/${serviceId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.ok;
};
