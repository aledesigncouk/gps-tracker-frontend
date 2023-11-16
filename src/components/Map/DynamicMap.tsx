import { useEffect } from 'react'
import Leaflet from 'leaflet'
import * as ReactLeaflet from 'react-leaflet'
import { Polyline, Marker, Popup } from 'react-leaflet'

import { track1, track2 } from '@mocks/index'

import 'leaflet/dist/leaflet.css'
import styles from '@styles/Map.module.scss'

const { MapContainer } = ReactLeaflet

const markerPos = [52.6680064, -2.490368]

const lime = { color: 'lime' }
const red = { color: 'red' }

// console.log('track >>> ', track.features[0].geometry.coordinates)

const Map = ({ children, className, width, height, ...rest }) => {
	let mapClassName = styles.map

	if (className) {
		mapClassName = `${mapClassName} ${className}`
	}

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

			<Marker position={markerPos}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>

			<Polyline
				positions={track1.features[0].geometry.coordinates}
				pathOptions={lime}
			/>
			<Polyline
				positions={track2.features[0].geometry.coordinates}
				pathOptions={red}
			/>
		</MapContainer>
	)
}

export default Map
