import React, { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"
import moment from "moment"
import { deleteUser, getRentalsByUserId, getUser } from "~/services/AuthService"

const Profile = () => {
	const [user, setUser] = useState({
		id: "",
		email: "",
		firstName: "",
		lastName: "",
		roles: [{ id: "", name: "" }]
	})
	const [rentals, setRentals] = useState([
		{
			id: "",
			brandName: "",
			modelName: "",
			colorName: "",
			carBodyType: "",
			startDate: "",
			finishDate: "",
			rentalConfirmationCode: ""
		}
	])
	const [message, setMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const navigate = useNavigate()

	const userId = localStorage.getItem("userId")
	const token = localStorage.getItem("token")
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUser(userId, token)
				
				setUser(userData)
			} catch (error) {
				console.error(error)
			}
		}

		fetchUser()
	}, [userId])

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await getRentalsByUserId(userId, token)
				setRentals(response)
			} catch (error) {
				console.error("Error fetching bookings:", error.message)
				setErrorMessage(error.message)
			}
		}

		fetchBookings()
	}, [userId])

	const handleDeleteAccount = async () => {
		const confirmed = window.confirm(
			"Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
		)
		if (confirmed) {
			await deleteUser(userId)
				.then((response) => {
					setMessage(response.data)
					localStorage.removeItem("token")
					localStorage.removeItem("userId")
					localStorage.removeItem("userRole")
					navigate("/")
					window.location.reload()
				})
				.catch((error) => {
					setErrorMessage(error.data)
				})
		}
	}

	return (
		<div className="">
			{errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
			{message && <p className="text-danger">{message}</p>}
			{user ? (
				<div className="card p-5" style={{ backgroundColor: "whitesmoke" }}>
					<h4 className="card-title text-center">Kullanıcı Bilgileri</h4>
					<div className="card-body">
						<div className="col-md-10 mx-auto">
							<div className="card mb-3 shadow">
								<div className="row g-0">
									<div className="col-md-2">
										<div className="d-flex justify-content-center align-items-center mb-4">
											<img
												src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
												alt="Profile"
												className="rounded-circle"
												style={{ width: "150px", height: "150px", objectFit: "cover" }}
											/>
										</div>
									</div>

									<div className="col-md-10">
										<div className="card-body">

											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">First Name:</label>
												<div className="col-md-10">
													<p className="card-text">{user.firstName}</p>
												</div>
											</div>
											<hr />

											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">Last Name:</label>
												<div className="col-md-10">
													<p className="card-text">{user.lastName}</p>
												</div>
											</div>
											<hr />

											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">Email:</label>
												<div className="col-md-10">
													<p className="card-text">{user.email}</p>
												</div>
											</div>

										</div>
									</div>
								</div>
							</div>

							<h4 className="card-title text-center">Kiralama Geçmişi</h4>

							{rentals.length > 0 ? (
								<div className="table-responsive rounded">
								<table className="table table-bordered  rounded table-hover table-striped">
									<thead>
										<tr>
											<th scope="col">Rental ID</th>
											<th scope="col">Marka</th>
											<th scope="col">Model</th>
											<th scope="col">Kasa tipi</th>
											<th scope="col">Başlangıç</th>
											<th scope="col">Bitiş</th>
											<th scope="col">Kiralama kodu</th>
											<th scope="col">Durum</th>
										</tr>
									</thead>
									<tbody>
										{rentals.map((rental, index) => (
											<tr key={index}>
												<td>{rental.id}</td>
												<td>{rental.brandName}</td>
												<td>{rental.colorName}</td>
												<td>{rental.carBodyType}</td>
												<td>
													{moment(rental.startDate).subtract(1, "month").format("MMM Do, YYYY")}
												</td>
												<td>
													{moment(rental.finishDate)
														.subtract(1, "month")
														.format("MMM Do, YYYY")}
												</td>
												<td>{rental.rentalConfirmationCode}</td>
												<td className="text-success">On-going</td>
											</tr>
										))}
									</tbody>
								</table>
								</div>
							) : (
								<div className="alert alert-warning" role="alert">Henüz rezervasyon yapmadınız.</div>

							)}

							<div className="d-flex justify-content-center">
								<div className="mx-2">
									<button className="btn btn-danger btn-sm" onClick={handleDeleteAccount}>
										Hesabımı Sil
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<p>Loading user data...</p>
			)}
		</div>
	)
}

export default Profile
