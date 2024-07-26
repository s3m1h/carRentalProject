import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getCarById } from '~/services/CarService';

function RentalCarForm() {
    const [rentalData, setRentalData] = useState({
        startDate: '',
        finishDate: '',
        carId: '',
        rentedCityId: '',
        deliveredCityId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRentalData({
            ...rentalData,
            [name]: value
        });
    };
    const { carId } = useParams()
	const navigate = useNavigate()

      const getCarPriceById = async (carId) => {
		try {
			const response = await getCarById(carId)
			setRoomPrice(response.roomPrice)
		} catch (error) {
			throw new Error(error)
		}
	}

	useEffect(() => {
		getCarPriceById(carId)
	}, [carId])

    const handleSubmit = (e) => {
        e.preventDefault();
        // Kiralama isteğini oluşturmak için burada gerekli işlemleri yapabilirsiniz.
        console.log(rentalData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUserId">
                <Form.Label>User ID</Form.Label>
                <Form.Control 
                    type="text"
                    name="userId"
                    value={rentalData.userId}
                    onChange={handleChange}
                    placeholder="User ID girin"
                    required
                />
            </Form.Group>
            <Form.Group controlId="formStartDate">
                <Form.Label>Başlangıç Tarihi</Form.Label>
                <Form.Control 
                    type="date"
                    name="startDate"
                    value={rentalData.startDate}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formFinishDate">
                <Form.Label>Bitiş Tarihi</Form.Label>
                <Form.Control 
                    type="date"
                    name="finishDate"
                    value={rentalData.finishDate}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formCarId">
                <Form.Label>Araç ID</Form.Label>
                <Form.Control 
                    type="number"
                    name="carId"
                    value={rentalData.carId}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formRentedCityId">
                <Form.Label>Kiralanan Şehir ID</Form.Label>
                <Form.Control 
                    type="number"
                    name="rentedCityId"
                    value={rentalData.rentedCityId}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formDeliveredCityId">
                <Form.Label>Teslim Edilen Şehir ID</Form.Label>
                <Form.Control 
                    type="number"
                    name="deliveredCityId"
                    value={rentalData.deliveredCityId}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Kirala
            </Button>
        </Form>
    );
}

export default RentalCarForm;
