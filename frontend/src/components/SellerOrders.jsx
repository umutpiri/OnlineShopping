import React from 'react';

export class SellerOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: ['onur', 'umut', 'berat', 'hasan'],
      inputValue: ''
    };
  }

  addName(name) {
    var copyNames = [...this.state.names];
    copyNames.push(name);
    this.setState({ names: copyNames });
  }

  deleteName(name) {
    var copyNames = [...this.state.names];
    copyNames.splice(copyNames.indexOf(name), 1);
    this.setState({ names: copyNames });
  }

  render() {
    var nameList = this.state.names.map(element => (
      <h3 key={element}>{element}</h3>
    ));
    return (
      <React.Fragment>
        {nameList}
        <input
          type='text'
          value={this.state.inputValue}
          onChange={input => {
            this.setState({ inputValue: input.target.value });
          }}
        />
        <button
          type='button'
          onClick={() => this.addName(this.state.inputValue)}
        >
          save
        </button>
        <button
          type='button'
          onClick={() => this.deleteName(this.state.inputValue)}
        >
          delete
        </button>
      </React.Fragment>
    );
  }
}
