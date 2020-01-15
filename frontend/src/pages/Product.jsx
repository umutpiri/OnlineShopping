import React from 'react';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: '', product: {} };
  }

  componentDidMount() {
    this.props.routeChange('Product');
    console.log(this.props);
    this.setState({ id: this.props.match.params.id });
    fetch('api/product/' + this.props.match.params.id)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(responseJson => {
        this.setState({ product: responseJson });
        console.log(responseJson);
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state.product);
    return (
      <div>
        Product id: {this.state.id}
        <hr />
      </div>
    );
  }
}

export default Product;
