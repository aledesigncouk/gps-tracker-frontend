import { Button } from 'react-bootstrap'
import SelectorDataRange from '@components/SelectorDataRange'

import styles from '@styles/Topbar.module.scss'

const Topbar = () => {
	return (
		<>
			<div className={styles.topbar}>
				<Button variant='primary'>fetch</Button>
				<div>
					From
					<SelectorDataRange />
				</div>
				<div>
					To
					<SelectorDataRange />
				</div>
			</div>
		</>
	)
}

export default Topbar
