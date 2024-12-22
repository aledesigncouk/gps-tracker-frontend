const useFetchDataByYear = async (req, res) => {
  const { API_URL, API_KEY } = process.env;
  const { start } = req.query;

  if (!start) {
    return res.status(400).json({ error: "Start value is required" });
  }

  const url = `${API_URL}?
    start=${encodeURIComponent(start)}`;

  try {
    const response = await fetch(url, {
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

export default useFetchDataByYear;
