import React, { useState } from 'react'
import Map from '@components/Map'
import Topbar from '@components/Topbar'

import styles from '@styles/Home.module.scss'

const DEFAULT_CENTER = [52.6680064, -2.490368]

export default function Home() {

	const [ year, setYear ] = useState('');
	
	return (
		<main className={styles.home}>
			<Topbar setYear={setYear} />
			<Map year={year} width='800' height='400' center={DEFAULT_CENTER} zoom={12}>
				{({ TileLayer, Marker, Popup }) => (
					<TileLayer
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>
				)}
			</Map>
		</main>
	)
}
