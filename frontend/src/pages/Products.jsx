import React from 'react';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mProduct: {
        brand: 'bran',
        category: { name: 'cat' },
        description: 'desc',
        discount: 10,
        id: 55,
        name: 'name',
        price: 555,
        stock: 1
      },
      products: []
    };
  }

  componentDidMount() {
    this.props.routeChange('Products');
    fetch('api/products')
      .then(response => response.json())
      .then(responseJson => this.setState({ products: responseJson }))
      .catch(err => console.log(err));
  }

  render() {
    var products = this.state.products.map(product => (
      <div
        style={{
          width: '30%',
          minWidth: 210,
          height: 350,
          position: 'relative'
        }}
        className='mx-2 my-2 py-2 px-2 border'
        key={product.id}
      >
        <div
          style={{ width: '95%', height: '50%', cursor: 'pointer' }}
          className='mx-auto border mt-2'
          onClick={() => {
            console.log(product.name);
            this.props.history.push('/product/' + product.id);
          }}
        >
          IMAGE
        </div>
        <small>Seller Rating: {product.seller.avg_rating}</small>
        <div
          style={{
            color: '#056866',
            maxHeight: 60,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: 14,
            cursor: 'pointer'
          }}
          onClick={() => {
            console.log(product.name);
            this.props.history.push('/product/' + product.id);
          }}
        >
          {product.name}
        </div>
        <div className='row mr-1 my-2'>
          <div className='col'>
            <strong>Brand: </strong>
            {product.brand}
          </div>
          <div style={{ color: '#f00' }}>
            $
            {(product.price - (product.price * product.discount) / 100)
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </div>
          <sub>
            <del>${product.discount > 0 ? product.price : null}</del>
          </sub>
        </div>
        <div
          style={{ position: 'absolute', bottom: 0 }}
          className='w-100 row justify-content-center'
        >
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => console.log('button')}
          >
            Add to Cart
          </button>
        </div>
        {product.discount > 0 ? (
          <div
            style={{
              backgroundColor: '#f95447',
              position: 'absolute',
              right: 0,
              top: 0,
              width: 50,
              textAlign: 'center',
              color: '#fff'
            }}
          >
            -%{product.discount}
          </div>
        ) : null}
      </div>
    ));
    console.log(this.state.products);
    return (
      <div style={{ backgroundColor: '#F8F3EF' }} className='py-4 px-4'>
        <div
          style={{ backgroundColor: '#F2EEEE' }}
          className='py-4 px-3 border'
        >
          <div className='row px-3'>
            <div
              style={{
                backgroundColor: '#fff',
                minHeight: 600,
                maxHeight: 900
              }}
              className='col-3 border'
            >
              Filters
            </div>
            <div className='col ml-3 '>
              <div style={{ backgroundColor: '#fff' }} className='border mb-3'>
                SORTINGGGGGGGG
              </div>
              <div style={{ backgroundColor: '#fff' }} className='border '>
                <div className='row justify-content-center'>{products}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
