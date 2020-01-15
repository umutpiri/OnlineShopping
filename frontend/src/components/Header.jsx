import React from 'react';

import { Link } from 'react-router-dom';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { IoMdPerson, IoMdCart } from 'react-icons/io';

export class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  renderHeaderRight() {
    if (!!this.props.user) {
      return (
        <div className='row align-items-center float-right mr-2'>
          <div className='row mr-5 align-items-center'>
            <IoMdPerson className='my-auto' color={'#fff'} size={'30px'} />
            <div className='my-auto' style={{ color: '#fff' }}>
              {this.props.user.firstName}
            </div>
          </div>
          <button
            type='button'
            className='row align-items-center'
            style={{
              backgroundColor: '#F16530',
              borderColor: '#F16530'
            }}
          >
            <IoMdCart className='my-auto' size={'20px'} />
            <h4>Cart</h4>
          </button>
        </div>
      );
    } else {
      return (
        <div
          style={{
            backgroundColor: '#384E6E',
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5
          }}
          className='row float-right'
        >
          <div className='col-sm align-items-center my-auto'>
            <IoMdPerson color={'#fff'} size={'30px'} />
          </div>
          <div
            className='col-sm d:block text-center'
            style={{ marginRight: ' 10px' }}
          >
            <Link
              style={{
                color: '#fff',
                textDecoration: 'none'
              }}
              className='row border-bottom bd-highlight'
              to='/login'
            >
              login
            </Link>
            <Link
              style={{ color: '#fff', textDecoration: 'none' }}
              className='row bd-highlight'
              to='/register/customer'
            >
              register
            </Link>
          </div>
        </div>
      );
    }
  }

  render() {
    if (this.props.isHeader)
      return (
        <React.Fragment>
          <div
            className='d-flex justify-content-end'
            style={{ backgroundColor: '#384E6E' }}
          >
            <a style={{ color: '#fff', marginRight: '25px' }} href='/login'>
              Contact us
            </a>
          </div>
          <Navbar style={{ backgroundColor: '#182B49' }} variant='dark'>
            <Navbar.Brand style={{ fontSize: 45 }} className='mr-auto'>
              <Link style={{ color: '#fff', textDecoration: 'none' }} to='/'>
                HUMBO
              </Link>
            </Navbar.Brand>
            <Form
              style={{
                width: '40%'
              }}
              inline
              className='mr-auto row'
            >
              <FormControl
                style={{ minWidth: 75 }}
                type='text'
                placeholder='Search'
                className='mr-sm-2 col-8'
              />
              <Button
                style={{ minWidth: 75 }}
                variant='outline-light text-center'
                className='col-3'
              >
                Search
              </Button>
            </Form>
            {this.renderHeaderRight()}
          </Navbar>
          <Nav
            style={{ backgroundColor: '#384E6E', width: '100%' }}
            className='d-flex justify-content-around'
          >
            <a style={{ color: '#fff' }} className='bd-highlight' href='/'>
              Category 1
            </a>
            <a style={{ color: '#fff' }} className='bd-highlight' href='/'>
              Category 2
            </a>
            <a style={{ color: '#fff' }} className='bd-highlight' href='/'>
              Category 3
            </a>
            <a style={{ color: '#fff' }} className='bd-highlight' href='/'>
              Category 4
            </a>
          </Nav>
          <div
            style={{ backgroundColor: '#fff', width: '100%' }}
            className='row mx-0'
          >
            <div className='col text-center'>
              Free Shipping, in order min 150 tl
            </div>
            <div className='col text-center'>24/7 Support</div>
          </div>
        </React.Fragment>
      );
    return null;
  }
}
