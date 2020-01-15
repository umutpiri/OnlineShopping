import React from 'react';

import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { register, getUser } from '../helpers/authHelper';

const types = { seller: 'seller', customer: 'customer' };

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { type: 'customer', other: 'seller' };

    this.submit = this.submit.bind(this);
  }

  submit(userInfo) {
    delete userInfo['password2'];
    if (types.customer === this.state.type) {
      delete userInfo['companyName'];
      delete userInfo['iban'];
    }
    register(this.state.type, userInfo);
    console.log(getUser());
  }

  componentDidMount() {
    this.props.routeChange('Register');
    if (types.seller === this.props.match.params.type)
      this.setState({ type: types.seller, other: types.customer });
    else this.setState({ type: types.customer, other: types.seller });
  }

  componentWillReceiveProps(props) {
    if (types.seller === props.match.params.type)
      this.setState({ type: types.seller, other: types.customer });
    else this.setState({ type: types.customer, other: types.seller });
  }

  render() {
    return (
      <div
        className='d-flex justify-content-center py-4'
        style={{ backgroundColor: '#F8F3EF' }}
      >
        <div
          className='justify-content-center border'
          style={{ backgroundColor: '#F2EEEE', width: '80%' }}
        >
          <div className='d-flex justify-content-between px-2 py-2'>
            <div>
              <h3>Register as {this.state.type}</h3>
              <div>
                <Link to={'/register/' + this.state.other}>
                  Go to {this.state.other} register page
                </Link>
              </div>
            </div>
            <div>
              Are you a member? <Link to='/login'>Log in</Link>
            </div>
          </div>
          <hr />
          <div className='d-flex justify-content-center py-2 px-5'>
            <Formik
              onSubmit={this.submit}
              validate={values => {
                let errors = {};
                if (!values.firstName) {
                  errors.firstName = 'Required';
                }
                if (!values.email) {
                  errors.email = 'Required';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address';
                }
                if (values.password.length < 6) {
                  errors.password = 'Minimum 6 characters';
                } else if (values.password2 !== values.password) {
                  errors.password2 = 'Password not match';
                }
                if (!values.agree) {
                  errors.agree = 'Required';
                }
                return errors;
              }}
              initialValues={{
                firstName: '',
                lastName: '',
                companyName: '',
                iban: '',
                email: '',
                password: '',
                password2: '',
                agree: false
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Row>
                    <Form.Group className='mx-1'>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        name='firstName'
                        value={values.firstName}
                        onChange={handleChange}
                        isInvalid={touched.firstName && !!errors.firstName}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mx-1'>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        name='lastName'
                        value={values.lastName}
                        onChange={handleChange}
                        isInvalid={touched.lastName && !!errors.lastName}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                  {this.state.type === types.seller ? (
                    <Form.Group>
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control
                        name='companyName'
                        value={values.companyName}
                        onChange={handleChange}
                        isInvalid={touched.companyName && !!errors.companyName}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.companyName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  ) : null}
                  {this.state.type === types.seller ? (
                    <Form.Group>
                      <Form.Label>IBAN</Form.Label>
                      <Form.Control
                        name='iban'
                        value={values.iban}
                        onChange={handleChange}
                        isInvalid={touched.iban && !!errors.iban}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.iban}
                      </Form.Control.Feedback>
                    </Form.Group>
                  ) : null}
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name='email'
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      name='password'
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Verify Password</Form.Label>
                    <Form.Control
                      type='password'
                      name='password2'
                      value={values.password2}
                      onChange={handleChange}
                      isInvalid={touched.password2 && !!errors.password2}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.password2}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div
                    style={{ backgroundColor: '#A2B4C1' }}
                    className='mb-2 pl-1'
                  >
                    <div>
                      * Your password must be at least 6 characters long
                    </div>
                    <div>
                      * It must contain at least one leter and one number
                    </div>
                  </div>
                  <Form.Group>
                    <Form.Check
                      type='checkbox'
                      name='agree'
                      label={'I have read and agree the membership agreement'}
                      checked={values.agree}
                      onChange={handleChange}
                      isInvalid={touched.agree && !!errors.agree}
                    />
                  </Form.Group>
                  <button type='submit' className='btn btn-primary w-100'>
                    Register
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
