import React from 'react';

export class SellerHelp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
  }
  render() {
    return (
      <div className='container my-5'>
        <h4>Help</h4>
        <br />
        <textarea
          style={{ height: 400 }}
          className='w-100 text-left'
          onChange={input => {
            this.setState({ input: input.target.value });
          }}
          value={this.state.input}
          placeholder={'Write your message here...'}
        />
        <button className='btn btn-primary px-3 py-2 mt-3'>Send</button>
      </div>
    );
  }
}
