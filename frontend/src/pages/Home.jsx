import React from 'react';

import { SlideLabel } from '../components/SlideLabel';
import { getUser, logout } from '../helpers/authHelper';

const slideContext = [
  {
    href: '/seller',
    src:
      'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'birrrrrrrrrrrr',
    info: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
  },
  {
    href: '/seller',
    src:
      'https://png.pngtree.com/thumb_back/fw800/back_pic/03/87/17/0857d1192214be1.jpg',
    title: 'ikiiiiiiiiii',
    info: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
  },
  {
    href: '/seller',
    src:
      'https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252__340.jpg',
    title: 'üüüüüüüüüçççççç',
    info: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
  }
];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLogin: false };

    this.toggleLogin = this.toggleLogin.bind(this);
  }

  componentDidMount() {
    this.props.routeChange('Home');
    console.log('home');
    console.log(getUser());
  }

  toggleLogin() {
    this.setState({ isLogin: !this.state.isLogin });
  }

  render() {
    return (
      <React.Fragment>
        <div className='container mt-md-2'>
          <a href='/demo'>Demo</a>
          <button type='button' onClick={this.toggleLogin}>
            Toggle login
          </button>
          <button
            type='button'
            onClick={() => {
              this.props.history.push('/seller');
            }}
          >
            Seller Account Page
          </button>
          <button
            type='button'
            onClick={() => {
              this.props.history.push('/products');
            }}
          >
            Products
          </button>
          <div className='w-75 mx-auto'>
            <SlideLabel slideContext={slideContext} />
          </div>
          <div style={{ height: '600px' }} className='row w-100 mx-auto mt-2'>
            <div className='col text-center bg-dark'>PRODUCT</div>
            <div className='col w-100 bg-light'>
              <div className='row-4 h-25 w-100 text-center align-middle bg-success'>
                CAT1
              </div>
              <div className='row-6 h-50 text-center my-auto bg-danger'>
                CAT2
              </div>
              <div className='row-2 h-25 align-middle bg-primary'>
                <h3 className='text-center'>CAT3</h3>
              </div>
            </div>
            <div className='col bg-secondary'>
              <div className='row-4 text-center'>CAT4</div>
              <div className='row-6 text-center'>CAT5</div>
              <div className='row-2 text-center'>CAT6</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
