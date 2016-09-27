import React, { Component, PropTypes } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const { total, today, onPress, onReset } = this.props;
    return (
      <div id='container'>
        
        <div id='button' onClick={onPress}>
          ✊
        </div>
        
        <div id='today'>
          Rejected <b>{today}</b> times today.<br/>
        </div>
        
        <div id='total'>
          {total} times total.
        </div>
        
        <div id='new' onClick={onReset}>
          New Day!
        </div>
      
      </div>
    );
  }
}

Button.propTypes = {
  total: PropTypes.number.isRequired,
  today: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default Button;