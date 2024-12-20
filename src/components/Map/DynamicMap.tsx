import { useEffect, useState } from 'react'
import Leaflet from 'leaflet'
import * as ReactLeaflet from 'react-leaflet'
import { Polyline } from 'react-leaflet'
import { getTrackByYear } from 'src/utils'

import 'leaflet/dist/leaflet.css'
import styles from '@styles/Map.module.scss'

const { MapContainer } = ReactLeaflet

const red = { color: 'red' }

const Map = ({ children, className, width, height, year, ...rest }) => {
	let mapClassName = styles.map

	if (className) {
		mapClassName = `${mapClassName} ${className}`
	}

	const [track, setTrack] = useState(null);
	
	  useEffect(() => {
		const fetchData = async () => {
		  if (year) {
			const result = await getTrackByYear(year);
			setTrack(result);
		  }
		};
	
		fetchData();
	
	  }, [year])

	useEffect(() => {
		;(async function init() {
			delete Leaflet.Icon.Default.prototype._getIconUrl
			Leaflet.Icon.Default.mergeOptions({
				iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
				iconUrl: 'leaflet/images/marker-icon.png',
				shadowUrl: 'leaflet/images/marker-shadow.png'
			})
		})()
	}, [])

	return (
		<MapContainer className={mapClassName} {...rest}>
			{children(ReactLeaflet, Leaflet)}

			{track && <Polyline
				positions={track?.geometry?.coordinates}
				pathOptions={red}
			/>}
		</MapContainer>
	)
}

export default Map
