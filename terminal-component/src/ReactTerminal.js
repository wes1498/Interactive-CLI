import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTerminalStateless from './ReactTerminalStateless';
import TerminalStateless from './ReactTerminalStateless';

class Terminal extends Component {
  constructor({emulatorState, inputStr, promptPath}) {
    super();

    this.state = {
      emulatorState,
      inputStr,
      promptPath
    };
  }

  _init(props) {
    const {emulatorState, inputStr, promptPath} = props;

    this.setState({
      emulatorState,
      inputStr,
      promptPath
    });
  }

  componentDidMount() {
    this._init(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this._init(nextProps);
    }
  }

  _onInputChange = (inputStr) => {
    this.setState({inputStr});
  }

  _onStateChange = (emulatorState, commandStr) => {
    const {onStateChange} = this.props;
    onStateChange(emulatorState, commandStr);
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const {emulatorState: removedEmulatorState, inputStr: removedInputStr, promptPath: removedPromptPath,  ...otherProps} = this.props;
    const {emulatorState, inputStr, promptPath} = this.state;

    // We're using the spread operator to pass along all props to the child componentm
    // except for emulatorState and inputStr which must come from the state.
    return (
      <ReactTerminalStateless
        {...otherProps}
        emulatorState={emulatorState}
        inputStr={inputStr}
        promptPath={promptPath}
        onInputChange={this._onInputChange}
        onStateChange={this._onStateChange}
      />
    );
  }
};

Terminal.propTypes = {
  ...TerminalStateless.commonPropTypes,
  emulatorState: PropTypes.object,
  inputStr: PropTypes.string,
  promptPath: PropTypes.string,
  onStateChange: PropTypes.func.isRequired
};

Terminal.defaultProps = {
  ...TerminalStateless.defaultProps
};

export default Terminal;
