import React from 'react';

import Carousel from 'react-bootstrap/Carousel';

export class SlideLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const slideItems = this.props.slideContext.map((element, index) => (
      <Carousel.Item key={index}>
        <a href={element.href}>
          <img
            style={{ maxHeight: '300px' }}
            className='d-block w-100'
            src={element.src}
            alt='slide'
          />

          <Carousel.Caption>
            <h3 style={{ color: '#000' }}>{element.title}</h3>
            <p style={{ color: '#000' }}>{element.info}</p>
          </Carousel.Caption>
        </a>
      </Carousel.Item>
    ));
    return <Carousel>{slideItems}</Carousel>;
  }
}
