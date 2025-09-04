import React, { Component } from "react";
import { connect } from "react-redux";

class Counter extends Component {
  handlePlus = () => {
    this.props.plus();
  };
  handleMinus = () => {
    this.props.minus();
  };
  render() {
    console.log(this.props);

    return (
      <>
        <h3>Counter App</h3>
        <form action="">
          <input type="button" value="+" onClick={this.handlePlus} />
          {this.props.count}
          <input type="button" value="-" onClick={this.handleMinus} />
        </form>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    count: state.counterReducer.initCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    plus: () => dispatch({ type: "plus" }),
    minus: () => dispatch({ type: "minus" }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
