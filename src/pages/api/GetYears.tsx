const useFetchYears = async (req, res) => {
  const { API_URL, API_KEY } = process.env;

  try {
    const response = await fetch(`${API_URL}?year=1`, { // to be changed
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    res.status(200).json(data);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }
};

export default useFetchYears;
