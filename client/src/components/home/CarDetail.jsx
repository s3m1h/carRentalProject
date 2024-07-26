import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { getCarDetails, rentCar } from '~/services/CarService';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useAuth } from '../auth/AuthProvider';
import { getUser } from '~/services/AuthService';
import moment from 'moment';
import Swal from 'sweetalert2';
import { getAllCities } from '~/services/CityService';

const CarDetail = () => {
  const { brand, model } = useParams();
  const [car, setCar] = useState(null);
  const [user, setUser] = useState({
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    roles: [{ id: '', name: '' }]
  });
  const [rentalInfo, setRentalInfo] = useState({
    carId: 0,
    userId: 0,
    startDate: '',
    finishDate: '',
    rentedCity: '',
    deliveredCity: '',
    customerFullName:'',
    customerEmail:''
  });
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCarDetails = async () => {
      const carData = await getCarDetails(brand, model);
      setCar(carData);
    };
    fetchCarDetails();
  }, [brand, model]);

  useEffect(() => {
    const fetchCities = async () => {
      const cityData = await getAllCities();
      setCities(cityData);
    };
    fetchCities();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRentalInfo({
      ...rentalInfo,
      [name]: value
    });
  };

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId, token);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (car && user) {
      setRentalInfo((prevInfo) => ({
        ...prevInfo,
        carId: car.carId,
        userId: user.id,
        customerEmail: user.email,
        customerFullName: user.firstName + ' ' + user.lastName
      }));
    }
  }, [car, user]);

  const handleRentCar = async () => {
    if (!rentalInfo.startDate || !rentalInfo.finishDate || !rentalInfo.rentedCity || !rentalInfo.deliveredCity) {
      alert('Please fill in all fields.');
      return;
    }

    const result = await rentCar(rentalInfo);
    // console.log(result);
    // if (result.success) {
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Araç kiralama başarılı bir şekilde gerçekleşti.',
    //     showConfirmButton: false,
    //     timer: 1500
    //   });
    // } else {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Araç kiralama sırasında bir sorun yaşandı.',
    //     text: 'Lütfen tekrar deneyiniz.',
    //   });
    // }
  };

  return (
    <Container className="py-5">
      {car ? (
        <>
          <Row className="mb-5">
            <Col md={6}>
              <LazyLoadImage
                className="img-fluid"
                src={`data:image/png;base64, ${car.photo}`}
                effect="blur"
                style={{ objectFit: 'cover', width: '100%' }}
                alt={car.carName}
              />
            </Col>
            <Col md={6}>
              <h1 className="fs-2 mb-2">
                {car.brandName} {car.carName}
              </h1>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Model Yılı:</strong> {car.modelYear}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Gövde Tipi:</strong> {car.carBodyType}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Yakıt Tipi:</strong> {car.fuelType}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Vites Tipi:</strong> {car.transmissionType}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Kilometre:</strong> {car.kilometer}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Günlük Fiyatı:</strong> {car.dailyPrice}₺
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Rengi:</strong> {car.colorName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Bilgi:</strong> {car.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="fs-3 mb-3">Aracı Kirala</h2>
              <Form>
                <Row>
                  <Col xs={12} md={6} className="mb-3">
                    <Form.Control
                      required
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={rentalInfo.startDate}
                      min={moment().format('YYYY-MM-DD')}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col xs={12} md={6} className="mb-3">
                    <Form.Control
                      required
                      type="date"
                      id="finishDate"
                      name="finishDate"
                      value={rentalInfo.finishDate}
                      min={moment().format('YYYY-MM-DD')}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col xs={12} md={6} className="mb-3">
                    <Form.Select
                      required
                      name="rentedCity"
                      value={rentalInfo.rentedCity}
                      onChange={handleInputChange}
                    >
                      <option value="">Şehir Seçin</option>
                      {cities.map(city => (
                        <option key={city.id} value={city.cityName}>
                          {city.cityName}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xs={12} md={6} className="mb-3">
                    <Form.Select
                      required
                      name="deliveredCity"
                      value={rentalInfo.deliveredCity}
                      onChange={handleInputChange}
                    >
                      <option value="">Şehir Seçin</option>
                      {cities.map(city => (
                        <option key={city.id} value={city.cityName}>
                          {city.cityName}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xs={12} className="mb-3">
                    <div className="d-grid">
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-100"
                        onClick={handleRentCar}
                        disabled={car.carCount <= 0}
                      >
                        Şimdi Kirala
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default CarDetail;
