import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {
  CountryDropdown,
  CountryRegionData,
  RegionDropdown
} from 'react-country-region-selector';
import { Formik } from 'formik';

export class AddressPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { country: '', region: '' };

    this.modalWillMount = this.modalWillMount.bind(this);
  }

  countryChange(val) {
    this.setState({ country: val });
  }

  regionChange(val) {
    this.setState({ region: val });
  }

  modalWillMount() {
    this.setState({
      country: this.props.address.country,
      region: this.props.address.region
    });
  }

  render() {
    return (
      <Modal
        onEnter={this.modalWillMount}
        show={this.props.show}
        onHide={this.props.onHide}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            onSubmit={values => {
              var address = values; //TODO { ...values };
              address.country = this.state.country;
              address.region = this.state.region;
              this.props.submit(address);
            }}
            validate={values => {
              let errors = {};
              if (!values.name) {
                errors.name = 'Required';
              }
              if (!values.description) {
                errors.description = 'Required';
              }

              return errors;
            }}
            initialValues={{
              name: this.props.address.name,
              description: this.props.address.description
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
              isSubmitting,
              dirty
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Row>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='text'
                      name='name'
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <Form.Control.Feedback
                      type='invalid'
                      className='text-center'
                    >
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <CountryDropdown
                      name='country'
                      value={this.state.country}
                      onChange={e => this.countryChange(e)}
                      className='form-control'
                    />
                    <div style={{ color: '#B33A3A' }}>
                      {this.state.submitted && this.state.country == ''
                        ? 'Required'
                        : null}
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Region</Form.Label>
                    <RegionDropdown
                      country={this.state.country}
                      name='region'
                      value={this.state.region}
                      onChange={e => this.regionChange(e)}
                      className='form-control'
                    />
                    <div style={{ color: '#B33A3A' }}>
                      {this.state.submitted && this.state.region == ''
                        ? 'Required'
                        : null}
                    </div>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as='textarea'
                      placeholder='Description'
                      name='description'
                      value={values.description}
                      onChange={handleChange}
                      isInvalid={!!errors.description}
                    />

                    <Form.Control.Feedback type='invalid'>
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <div className='row mx-3'>
                  <Button type='submit'>Save</Button>
                  <div className='col'>
                    <Button className='float-right' onClick={this.props.onHide}>
                      Close
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  }
}
