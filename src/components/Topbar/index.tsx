import { Button } from 'react-bootstrap'

import styles from '@styles/Topbar.module.scss'

const Topbar = () => {
	return (
		<>
			<div className={styles.topbar}>
				topbar
				<Button variant='primary'>Click Me!</Button>
			</div>
		</>
	)
}

export default Topbar
