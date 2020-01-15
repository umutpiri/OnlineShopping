import React from 'react';

export default class Demo extends React.Component {
  componentDidMount() {
    this.props.routeChange('Demo');
  }
  render() {
    return <div>deneme</div>;
  }
}
