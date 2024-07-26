import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import AdminHeader from './AdminHeader'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <Container fluid className="admin-layout bg-dark text-dark min-vh-100">
      <Row className="justify-content-md-center">
        <Col xs={11} md={13}>
          <AdminHeader />
          <Card className="content-card mt-4 mb-4 shadow-sm">
            <Card.Body>
              <Outlet />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    )
}

export default AdminLayout