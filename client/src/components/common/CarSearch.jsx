import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import { getAllCars } from '~/services/CarService';
import { getAllBrands } from '~/services/BrandService';

const CarSearch = () => {
  const [brands, setBrands] = useState([]);
  const [cars, setCars] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [filteredModels, setFilteredModels] = useState([]);
  const [carResults, setCarResults] = useState([]);

  const navigate = useNavigate();

  // API'den verileri çekme
  useEffect(() => {
    const loadData = async () => {
      const carsData = await getAllCars();
      const brandsData = await getAllBrands();
      setCars(carsData);
      setBrands(brandsData);
    };
    loadData();
  }, []);

  // Marka seçildiğinde modelleri filtreleme
  useEffect(() => {
    if (selectedBrand) {
      const filtered = cars.filter(car => car.brandName === selectedBrand);
      const uniqueModels = [...new Set(filtered.map(car => car.carName))];
      setFilteredModels(uniqueModels);
      setSelectedModel(''); // Yeni marka seçildiğinde modeli sıfırlayın
    } else {
      setFilteredModels([]);
      setSelectedModel(''); // Marka seçilmediğinde modeli sıfırlayın
    }
  }, [selectedBrand, cars]);

  // Marka ve model seçildiğinde sonuçları güncelleme
  useEffect(() => {
    if (selectedBrand && selectedModel) {
      const results = cars.filter(car => car.brandName === selectedBrand && car.carName === selectedModel);
      setCarResults(results);
    } else {
      setCarResults([]);
    }
  }, [selectedBrand, selectedModel, cars]);

  const handleSearch = () => {
    if (selectedBrand && selectedModel) {
      navigate(`/car-detail/${selectedBrand}/${selectedModel}`);
    }
  };
  

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1 className="fs-2 mb-2">En İyi Arabalarınızı Arayın</h1>
          <p className="fs-5 mb-5">İhtiyaçlarınız için mükemmel arabayı bulun.</p>
          <Form>
            <Row>
              <Col xs={12} md={4} className="mb-3">
                <Form.Select size="lg" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                  <option value="">Marka seç</option>
                  {brands.length > 0 && brands.map(brand => (
                    <option key={brand.id} value={brand.brandName}>
                      {brand.brandName}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={12} md={4} className="mb-3">
                <Form.Select size="lg" value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} disabled={!selectedBrand}>
                  <option value="">{selectedBrand ? "Model seç" : "---"}</option>
                  {filteredModels.map((model, index) => (
                    <option key={index} value={model}>
                      {model}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={12} md={4} className="mb-3">
                <div className="d-grid">
                  <Button variant="primary" size="lg" className="w-100" disabled={!selectedModel} onClick={handleSearch}>
                    Şimdi ara
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CarSearch;
