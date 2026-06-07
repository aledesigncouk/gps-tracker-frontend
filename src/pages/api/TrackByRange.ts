import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { API_BASE_URL, API_KEY } = process.env;
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ error: "Start and End values are required" });
  }

  const url = `${API_BASE_URL}/track?start=${encodeURIComponent(start as string)}&end=${encodeURIComponent(end as string)}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY ?? "",
      },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
