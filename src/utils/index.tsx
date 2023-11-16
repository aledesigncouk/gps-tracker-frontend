// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import React, { useEffect, useState } from 'react'

// fetch ALL data, filters applied on frontend
export const fetchData = () => {
	const [allData, setData] = useState([])
	useEffect(() => {
		fetch('https://www.yoroxid.com/nautilus/items/read.php')
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				setData(data)
			})
			.catch((err) => {
				console.log(err.message)
			})
	}, [])

	console.log('data:', allData)
}

/* get tracks year
 */
export const getTrackByYear = (dataset) => {
	return 'track from range'
}

/* get tracks by data range
 */
export const getTrackByRange = () => {
	return 'track from range'
}

/* convert data from database format to geojson

filtro a monte (nella richiesta)
****** INPUT
{
  "points": [
    {
      "id": 1,
      "datatime": "2014-06-01 01:12:26", // properties: { year: '2022' },
      "created": "2014-06-01 01:12:26",

	  // return from server only the list of coords
      "lat": "52.660900",
      "lon": "-2.482342" // geometry: { type: 'LineString', coordinates: [...]
    },
    
  ]
}

for all 
	datatime YYYY-MM-DD => property 

***** OUTPUT
{
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			properties: { year: '2022' }, // do not set properties for now
			geometry: {
				type: 'LineString',
				coordinates: [
					[52.69204808652421, -2.5520720727985235],
					[52.688930911955794, -2.5304721852188834],
					[52.69080124340172, -2.5167579708822814],
					[52.68809962781904, -2.4739010510800767],
					[52.682903743411345, -2.4475011884826188],
					[52.67937018889114, -2.41252994192439],
					[52.67833085374511, -2.3799586828745873],
					[52.67562846663057, -2.354587386351966],
					[52.66855989455152, -2.329558945188154]
				]
			}
		}, {...}
	]
}
 */
export const geoJsonConverter = (input) => {}
