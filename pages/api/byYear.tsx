const useFetchDataByYear = async(req, res) => {

  const { API_URL, API_KEY } = process.env
  const year = 2024; // dev mock

  try {
    const response = await fetch(
      `${API_URL}?year=${year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    // setData(data);
    res.status(200).json(data);
  } catch (err) {
    // setError(err.message);
    res.status(500).json({ error: err.message });
  }
};

export default useFetchDataByYear;
