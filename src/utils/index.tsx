import React, { useEffect, useState } from "react";

export const useFetchDataByYear = () => {
  const [allData, setData] = useState([]);
  const [error, setError] = useState(null);

  const year = 2024;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}?year=${year}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (err) {
        setError(err.message);
      }
    };
    console.log("fetching data");
    fetchData();
  }, []);

  return { data: allData, error };
};
