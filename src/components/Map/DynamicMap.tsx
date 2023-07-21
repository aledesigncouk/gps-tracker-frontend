import { useEffect } from 'react'
import Leaflet from 'leaflet'
import * as ReactLeaflet from 'react-leaflet'
import { Polyline, Marker, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import styles from '@styles/Map.module.scss'

const { MapContainer } = ReactLeaflet

const track1 = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			properties: {},
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
		}
	]
}

const track2 = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			properties: {},
			geometry: {
				coordinates: [
					[52.73725174352589, -2.413093745962925],
					[52.716436790837065, -2.449918646404626],
					[52.71680857355355, -2.4572836264923126],
					[52.71011599983487, -2.4698654674763816],
					[52.70565371362798, -2.461272990707158],
					[52.69933136033498, -2.4514530172563695],
					[52.691706127899835, -2.4443949113380086],
					[52.68612584567444, -2.4471567788713458],
					[52.679242515409015, -2.4388711762714763],
					[52.669008533055745, -2.426596209458353],
					[52.65765531227234, -2.425982461117229],
					[52.64853337587917, -2.430278699502196],
					[52.64555437221421, -2.4364161829091415],
					[52.63233259508476, -2.4327336928645025],
					[52.62301908620864, -2.421072474391792],
					[52.61836158845597, -2.41462811681464]
				],
				type: 'LineString'
			}
		}
	]
}
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
