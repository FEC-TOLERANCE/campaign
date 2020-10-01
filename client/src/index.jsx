const React = require('react');
const ReactDOM = require('react-dom');

class Campaign extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p>campaign</p>
    )
  }
}

ReactDOM.render(<Campaign />, document.getElementById('campaign'));