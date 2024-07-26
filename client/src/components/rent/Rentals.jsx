import React, { useEffect, useState } from 'react';
import RentalsTable from './RentalsTable';
import { deleteRental, getAllRentals } from '~/services/RentalService';
import Loading from '../common/Loading';

const Rentals = () => {
    const [rentInfo, setRentInfo] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState("")

	useEffect(() => {
		setTimeout(() => {
			getAllRentals()
				.then((data) => {
					setRentInfo(data)
					setIsLoading(false)
				})
				.catch((error) => {
					setError(error.message)
					setIsLoading(false)
				})
		}, 1000)
	}, [])

	const handleRentalCancellation = async (bookingId) => {
		try {
			await deleteRental(bookingId)
			const data = await getAllRentals()
			setRentInfo(data)
		} catch (error) {
			setError(error.message)
		}
	}

	return (
		<section  className=' rounded'>
			
			{error && <div className="alert alert-danger">{error}</div>}
			
			{isLoading ? (
				<Loading/>
			) : (
				<div>
					
					<RentalsTable
						rentInfo={rentInfo}
						handleRentalCancellation={handleRentalCancellation}
					/>
				</div>
				
			)}
		</section>
	)
}

export default Rentals;
