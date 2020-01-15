import React from 'react';

export class Footer extends React.Component {
  render() {
    if (this.props.isFooter)
      return (
        <React.Fragment>
          <div className='footer sticky-bottom'>
            <div
              style={{ backgroundColor: '#4566c1', width: '100%' }}
              className='d-flex justify-content-around'
            >
              <div
                style={{ color: '#fff' }}
                className='d-flex flex-column bd-highlight mb-3 mt-auto'
                href='/'
              >
                <a
                  style={{ color: 'white' }}
                  className='p-1 bd-highlight'
                  href='/'
                >
                  FOOTER
                </a>
                <a
                  style={{ color: 'white' }}
                  className='p-1 bd-highlight'
                  href='/'
                >
                  FOOTER
                </a>
                <a
                  style={{ color: 'white' }}
                  className='p-1 bd-highlight'
                  href='/'
                >
                  FOOTER
                </a>
                <a
                  style={{ color: 'white' }}
                  className='p-1 bd-highlight'
                  href='/'
                >
                  FOOTER
                </a>
                <a
                  style={{ color: 'white' }}
                  className='p-1 bd-highlight'
                  href='/'
                >
                  FOOTER
                </a>
              </div>
              <div
                style={{ color: '#fff' }}
                className='d-flex flex-column bd-highlight mb-3'
                href='/'
              >
                <a
                  style={{ color: 'white' }}
                  className='p-1 bd-highlight'
                  href='/'
                >
                  FOOTER
                </a>
                <a
                  style={{ color: 'white' }}
                  className='p-1 bd-highlight'
                  href='/'
                >
                  FOOTER
                </a>
                <a
                  style={{ color: 'white' }}
                  className='p-1 bd-highlight'
                  href='/'
                >
                  FOOTER
                </a>
                <a
                  style={{ color: 'white' }}
                  className='p-1 bd-highlight'
                  href='/'
                >
                  FOOTER
                </a>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    return null;
  }
}
