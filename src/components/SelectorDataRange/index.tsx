import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import styles from '@styles/DateRangeSelector.module.scss'

const DateRangeSelector = () => {
	// starting set current date
	const [startDate, setStartDate] = useState(new Date())

	return (
		<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
	)
}

export default DateRangeSelector
