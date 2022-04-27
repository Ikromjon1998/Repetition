// import logo from './logo.svg';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar, Nav, Form, FormControl, Container, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import './main.css'

function App() {
  return (
    <>
      <Navbar className='navigation' expand="sm" fixed="top">
        <Container fluid>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />

          <Navbar.Brand style={{color: 'black'}} href="#">
            
            Fiml Library
          </Navbar.Brand>

          <Form inline className='d-none d-sm-block justify-content-center'>
            <FormControl type="text" placeholder='Search' className='mr-sm-2'></FormControl>

          </Form>

          <Navbar.Brand className="justify-content-end">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
          </Navbar.Brand>
        </Container>

        <NavbarCollapse id="responsive-navbar-nav">

        </NavbarCollapse>
      </Navbar>

      <Container fluid className='vheight-100'>
        <Row className='below-nav'>
          <Col sm={4} className="collapse d-sm-block d-none bg-light" id="left-sidebar">
            <ListGroup variant='flush'>
              <ListGroup.Item className='list-item active'>All</ListGroup.Item>
              <ListGroup.Item className='list-item'>Favorites</ListGroup.Item>
              <ListGroup.Item className='list-item'>Best Rated</ListGroup.Item>
              <ListGroup.Item className='list-item'>Seen Last Month</ListGroup.Item>
              <ListGroup.Item className='list-item'>Unseen</ListGroup.Item>
            </ListGroup>
          </Col>

          <Col sm={8}>
            <h1>All</h1>
            <ListGroup variant='flush'>
              <ListGroup.Item className="list-group-item d-flex justify-content-between align-items-center">
                1
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item d-flex justify-content-between align-items-center">
                2
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item d-flex justify-content-between align-items-center">
                3
              </ListGroup.Item>

            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
