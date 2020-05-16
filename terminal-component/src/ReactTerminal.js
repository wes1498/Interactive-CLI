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
    if (this.isDirectoryChange(commandStr)){
      this.onDirectoryChange(commandStr)
    }
    this.setState({emulatorState,
                   inputStr: ''});
  }
  isDirectoryChange(commandStr){
    var str = commandStr.split(" ")
    if(str[0]==='cd') {return true}
    return false
  }
  onDirectoryChange(commandStr){
    var str = commandStr.split(" ")
    var path = str[1];
    if(path===''){return}
    switch(path) {
      case '.':
        console.log("doesnt change command prompt. (current directory)")
        break;
      case '..':
        if(this.state.promptPath === ''){
          console.log("doesnt change prompt symbol, at root directory")
        } else {
          path = this.state.promptPath.split('/')
          path.pop()
          path.join('/')
          console.log(path)
          this.setState({promptPath: path});
        }
        break;
      default:
        if(path.charAt(path.length-1)==='/'){
          path = path.splice(0, path.length - 1);
        }
        if(path.charAt(0)==='/'){
          path = path.splice(1);
        }
        this.setState((state) => ({
          promptPath: state.promptPath + '/' + path
        }));
    }
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
  promptPath: PropTypes.string
};

Terminal.defaultProps = {
  ...TerminalStateless.defaultProps
};

export default Terminal;
