import { Button } from 'react-bootstrap'
import SelectorDataRange from '@components/SelectorDataRange'
import { useState } from 'react'
import styles from '@styles/Topbar.module.scss'
import SelectedTrack from '@components/SelectedTrack'

const Topbar = ({ setYear }) => {
	const [inputValue, setInputValue] = useState('');

	const handleClick = () => {
		setYear(inputValue);
	};

	return (
		<>
		
			<div className={styles.topbar}>
			<SelectedTrack year={inputValue} />
				{/* <Button variant='primary'>fetch</Button>  */}
				{/* <div>
					From
					<SelectorDataRange />
				</div>
				<div>
					To
					<SelectorDataRange />
				</div> */}

				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Type something"
				/>

				<button onClick={handleClick}>Submit</button>
			</div>

		</>
	)
}

export default Topbar
