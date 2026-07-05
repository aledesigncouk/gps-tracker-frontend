export const fetchApi = async (path: string, options?: RequestInit): Promise<Response> => {
  const { API_BASE_URL, API_KEY } = process.env;

  return fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY ?? "",
      ...options?.headers,
    },
  });
};
