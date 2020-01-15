import React from 'react';

import { AddressPopup } from './AddressPopup';
import { FaPencilAlt } from 'react-icons/fa';

export class SellerAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [
        {
          name: 'deneme',
          country: 'Turkey',
          region: 'Ankara',
          description: 'denemee'
        },
        {
          name: 'deneme2',
          country: 'Turkey',
          region: 'Istanbul',
          description: 'deneme2'
        }
      ],
      selected: [],
      address: { name: '', country: '', region: '', description: '' },
      showPopup: false
    };

    this.openAdd = this.openAdd.bind(this);
  }

  openEdit(index) {
    this.setState({ address: this.state.addresses[index] }, () =>
      this.setState({ showPopup: true })
    );
  }

  openAdd() {
    this.setState(
      {
        address: { name: '', country: '', region: '', description: '' }
      },
      () => this.setState({ showPopup: true })
    );
  }

  submit(val) {
    console.log(val);
  }

  render() {
    var addresses = this.state.addresses.map((element, index) => (
      <div key={index} className='row border'>
        <input
          style={{ width: 20, height: 20, margin: 7 }}
          type='checkbox'
          checked={this.state.selected[index] == true ? true : false}
          onChange={event => {
            var selected = [...this.state.selected];
            selected[index] = event.target.checked;
            this.setState({ selected });
          }}
          className=' my-auto'
        />
        <div className='col ml-2'>
          <div className='row'>
            <strong>Name: </strong> {element.name}
          </div>
          <div className='row'>
            <strong>Contry: </strong>
            {element.country}
          </div>
          <div className='row'>
            <strong>Region: </strong>
            {element.region}
          </div>
        </div>
        <div className='col'>
          <div className='row'>
            <strong>Description: </strong> {element.description}
          </div>
        </div>
        <FaPencilAlt
          style={{
            backgroundColor: '#bbb',
            borderBottomLeftRadius: 8,
            padding: 5,
            cursor: 'pointer'
          }}
          size={'35px'}
          onClick={() => this.openEdit(index)}
        />
      </div>
    ));
    return (
      <div className='container my-5'>
        <h4>Addresses</h4>
        <br />
        <div className='col'>
          <div className='row pl-0 mb-3'>
            <input
              style={{ width: 20, height: 20, margin: 7 }}
              type='checkbox'
              className=' my-auto'
              value={this.state.selectAll}
              onChange={event => {
                var selected = new Array(this.state.addresses.length);
                selected.fill(event.target.checked);
                this.setState({ selectAll: event.target.checked, selected });
              }}
            />
            <div className='col pl-0 ml-0'>Select All</div>
            <div style={{ color: '#00f' }} className='float-right mr-4'>
              Remove Selected Items
            </div>
          </div>
        </div>
        {addresses}
        <button
          className='btn btn-primary float-left mt-3 px-3'
          type='button'
          onClick={this.openAdd}
        >
          Add
        </button>
        <AddressPopup
          address={this.state.address}
          show={this.state.showPopup}
          onHide={() => this.setState({ showPopup: false })}
          submit={this.submit}
        />
      </div>
    );
  }
}
