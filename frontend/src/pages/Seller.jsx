import React from 'react';
import 'normalize.css';

import styles from '../app.sass';

import { SellerOrders } from '../components/SellerOrders';
import { SellerProducts } from '../components/SellerProducts';
import { SellerAccount } from '../components/SellerAccount';
import { SellerAddress } from '../components/SellerAddress';
import { SellerHelp } from '../components/SellerHelp';

const selectedColor = '#11f';

class Seller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'profile'
    };
  }

  componentDidMount() {
    this.props.routeChange('Seller');
    fetch('api/s')
      .then(response => {
        return response.json();
      })
      .then(seller => {
        this.setState({ seller });
      })
      .catch(err => console.log(err));
  }

  renderPage() {
    switch (this.state.page) {
      case 'profile':
        return <SellerAccount />;
      case 'orders':
        return <SellerOrders />;
      case 'addresses':
        return <SellerAddress />;
      case 'products':
        return <SellerProducts seller={this.state.seller.email} />;
      case 'help':
        return <SellerHelp />;
      default:
        return <SellerAccount />;
    }
  }

  render() {
    return (
      <div style={{ backgroundColor: '#ccc' }}>
        <div className='container pt-4 pb-5'>
          <div className='row'>
            <div
              style={{ backgroundColor: '#fff' }}
              className='col-3 mr-4 pt-4'
            >
              <h4 className='text-center border border-dark'> Name Surname</h4>
              <h4 className='text-center border border-dark'> Company Name</h4>
              <br />
              <br />
              <h5
                className={styles.link}
                style={{
                  color: this.state.page === 'profile' ? selectedColor : null
                }}
                onClick={() => this.setState({ page: 'profile' })}
              >
                Profile
              </h5>
              <h5
                className={styles.link}
                style={{
                  color: this.state.page === 'orders' ? selectedColor : null
                }}
                onClick={() => this.setState({ page: 'orders' })}
              >
                Orders
              </h5>
              <h5
                className={styles.link}
                style={{
                  color: this.state.page === 'addresses' ? selectedColor : null
                }}
                onClick={() => this.setState({ page: 'addresses' })}
              >
                Addresses
              </h5>
              <h5
                className={styles.link}
                style={{
                  color: this.state.page === 'products' ? selectedColor : null
                }}
                onClick={() => this.setState({ page: 'products' })}
              >
                Products
              </h5>
              <br />
              <br />
              <hr />
              <h5
                className={styles.link}
                style={{
                  color: this.state.page === 'help' ? selectedColor : null
                }}
                onClick={() => this.setState({ page: 'help' })}
              >
                Help
              </h5>
              <hr />
              <h5
                className={styles.link}
                onClick={() => this.setState({ page: 'help' })}
              >
                Logout
              </h5>
              <br />
            </div>
            <div style={{ backgroundColor: '#fff' }} className='col'>
              {this.renderPage()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Seller;
