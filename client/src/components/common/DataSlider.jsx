import React, { useState } from 'react';
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { DateRangePicker } from 'react-date-range';

export const DataSlider = ({ onDateChange, onFilterChange }) => {
    const [dateRange, setDateRange] = useState({
		startDate: undefined,
		endDate: undefined,
		key: "selection"
	})

	const handleSelect = (ranges) => {
		setDateRange(ranges.selection)
		onDateChange(ranges.selection.startDate, ranges.selection.endDate)
		onFilterChange(ranges.selection.startDate, ranges.selection.endDate)
	}

	const handleClearFilter = () => {
		setDateRange({
			startDate: undefined,
			endDate: undefined,
			key: "selection"
		})
		onDateChange(null, null)
		onFilterChange(null, null)
	}
	return (
		<div className='p-5'>
			<h5>Kiralamaları tarihe göre filtrele</h5>
			<DateRangePicker ranges={[dateRange]} onChange={handleSelect} className="mb-4" />
			<br />
			<button className="btn btn-secondary" onClick={handleClearFilter}>
				Filtre temizle
			</button>
		</div>
	)
}


