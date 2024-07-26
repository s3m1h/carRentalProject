import React, { useEffect, useState } from 'react';
import { DataSlider } from '../common/DataSlider';

const RentalsTable = ({ rentInfo, handleRentalCancellation }) => {

    const [filteredRentals, setFilteredRentals] = useState(rentInfo)

	const filterRentals = (startDate, endDate) => {
		let filtered = rentInfo
		if (startDate && endDate) {
			filtered = rentInfo.filter((booking) => {
				const rentStarDate = parseISO(booking.checkInDate)
				const rentEndDate = parseISO(booking.checkOutDate)
				return (
					rentStarDate >= startDate && rentEndDate <= endDate && rentEndDate > startDate
				)
			})
		}
		setFilteredRentals(filtered)
	}

	useEffect(() => {
		setFilteredRentals(rentInfo)
	}, [rentInfo])
    return (
		<div className="p-4">
			<div className='text-center'>
				<DataSlider onDateChange={filterRentals} onFilterChange={filterRentals} />
			</div>
			<div className="d-flex justify-content-between mb-3 mt-5">
              <h2>Kiralamalar listesi</h2>
            </div>
			<table className="table table-bordered table-hover">
				<thead>
					<tr>
						<th>S/N</th>
						<th>Rental ID</th>
						<th>Car ID</th>
						<th>Start Date</th>
						<th>Finish Date</th>
						<th>Brand name</th>
						<th>Color Name</th>
						<th>Rented Kilometer</th>
						<th>Delivered Kilometer</th>
						<th>Rented CityId</th>
						<th>Rented CityName</th>
						<th>Delivered CityId</th>
						<th>Delivered CityName</th>
						<th colSpan={2}>Actions</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{!filteredRentals && filteredRentals.map((rental, index) => (
						<tr key={rental.id}>
							<td>{index + 1}</td>
							<td>{rental.id}</td>
							<td>{rental.room.id}</td>
							<td>{rental.room.roomType}</td>
							<td>{rental.startDate}</td>
							<td>{rental.finishDate}</td>
							<td>{rental.guestName}</td>
							<td>{rental.guestEmail}</td>
							<td>{rental.numOfAdults}</td>
							<td>{rental.numOfChildren}</td>
							<td>{rental.totalNumOfGuests}</td>
							<td>{rental.confirmationCode}</td>
							<td>
								<button
									className="btn btn-danger btn-sm"
									onClick={() => handleRentalCancellation(booking.id)}>
									Cancel
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{filterRentals.length === 0 && <p>Seçilen tarihler için rezervasyon bulunamadı..</p>}
		</div>
	)
}

export default RentalsTable;
