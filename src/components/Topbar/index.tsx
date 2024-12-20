import Button from 'react-bootstrap/Button'
import YearSelector from '@components/YearSelector'
import SelectorDataRange from '@components/SelectorDataRange'
import { useState } from 'react'
import styles from '@styles/Topbar.module.scss'
import SelectedTrack from '@components/SelectedTrack'

const Topbar = ({ setYear }): JSX.Element => {
	const [inputValue, setInputValue] = useState('');

	const handleClick = () => {
		setYear(inputValue);
	};

	return (
		<>

			<div className={styles.topbar}>
				<YearSelector onSelect={setYear} />
				{/* <SelectedTrack year={inputValue} /> */}

				{/* <Button variant='primary'>fetch</Button> 
				<div>
					From
					<SelectorDataRange />
				</div>
				<div>
					To
					<SelectorDataRange />
				</div> */}

				{/* <input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Type something"
				/>

				<Button variant='primary' onClick={handleClick}>Set track</Button> */}
			</div>

		</>
	)
}

export default Topbar
