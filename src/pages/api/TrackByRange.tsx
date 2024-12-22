const useFetchTrackByRange = async (req, res) => {
  const { API_URL, API_KEY } = process.env;
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ error: "Start and End values are required" });
  }

  const url = `${API_URL}?
    start=${encodeURIComponent(start)}
    &end=${encodeURIComponent(end)}`;

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

export default useFetchTrackByRange;
