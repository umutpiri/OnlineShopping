import React from 'react';

import { ProductPopup } from './ProductPopup';
import { FaPencilAlt } from 'react-icons/fa';

export class SellerProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selected: [],
      mProduct: {},
      loading: true,
      showPopup: false,
      popupTitle: ''
    };

    this.addProduct = this.addProduct.bind(this);
    this.submitNew = this.submitNew.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
  }

  componentDidMount() {
    this.initApp();
  }

  async initApp() {
    await fetch('api/s/products')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ products: responseJson });
      })
      .catch(err => console.log(err));
    this.setState({ loading: false, showPopup: false });
  }

  addProduct() {
    this.setState({
      mProduct: {
        brand: '',
        stock: '',
        name: '',
        price: '',
        description: '',
        category: 'TV',
        discount: '',
        color: ''
      },
      popupTitle: 'Add Product',
      showPopup: true
    });
  }

  //add new product to database and reload products
  submitNew(product) {
    console.log(product);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    };
    fetch('/api/s/product', requestOptions)
      .then(result => {
        this.initApp();
      })
      .catch(err => console.log(err));
  }

  //open edit product popup
  async editProduct(index) {
    var mProduct = this.state.products[index];
    if (mProduct.category.name) mProduct.category = mProduct.category.name;
    await this.setState({
      mProduct,
      popupTitle: 'Edit Product',
      showPopup: true,
      currentIndex: index
    });
  }

  //save editted product on database
  submitEdit(product) {
    var oldProduct = this.state.products[this.state.currentIndex];
    for (var key in product) oldProduct[key] = product[key];
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(oldProduct)
    };
    fetch('/api/s/product/' + oldProduct.id, requestOptions)
      .then(result => {
        if (result.ok) {
          this.state.products[this.state.currentIndex] = oldProduct;
          this.setState({ showPopup: false });
          return result.json();
        } else {
          return result.json().then(err => {
            this.setState({ err: 'Error: ' + err.message });
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    var products = this.state.products.map((element, index) => (
      <div key={element.id} className='row border'>
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
        <div
          style={{ width: 100, height: 100 }}
          className='my-auto border text-center'
        >
          image
        </div>
        <div className='col ml-2'>
          <div className='row'>
            <strong>Name: </strong> {element.name}
          </div>
          <div className='row'>
            <strong>Category: </strong>
            {element.category.name ? element.category.name : element.category}
          </div>
          <div className='row'>
            <strong>Discount: </strong>
            {element.discount}
          </div>
          <div className='row'>
            <strong>Description: </strong>
            {element.description}
          </div>
        </div>
        <div className='col'>
          <div className='row'>
            <strong>Brand: </strong> {element.brand}
          </div>
          <div className='row'>
            <strong>Color: </strong> {element.color}
          </div>
          <div className='row'>
            <strong>Stock: </strong> {element.stock}
          </div>
          <div className='row'>
            <strong>Price: </strong> {element.price}
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
          onClick={() => this.editProduct(index)}
        />
      </div>
    ));
    if (this.state.loading) return <div>loading...</div>;
    return (
      <div className='container my-5'>
        <h4>Products</h4>
        <br />
        <div className='col'>
          <div className='row pl-0 mb-3'>
            <input
              style={{ width: 20, height: 20, margin: 7 }}
              type='checkbox'
              className=' my-auto'
              value={this.state.selectAll}
              onChange={event => {
                var selected = new Array(this.state.products.length);
                selected.fill(event.target.checked);
                this.setState({ selectAll: event.target.checked, selected });
              }}
            />
            <div className='col pl-0 ml-0'>Select All</div>
            <div style={{ color: '#00f' }} className='float-right mr-4'>
              Remove Selected Items
            </div>
          </div>
          {products}
        </div>
        <button
          className='btn btn-primary float-left mt-3 px-3'
          onClick={this.addProduct}
        >
          Add
        </button>
        <ProductPopup
          mtitle={this.state.popupTitle}
          product={this.state.mProduct}
          show={this.state.showPopup}
          submitNew={this.submitNew}
          submitEdit={this.submitEdit}
          onHide={() => this.setState({ showPopup: false })}
        />
      </div>
    );
  }
}
