import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  Emulator, HistoryKeyboardPlugin, EmulatorState
} from '../../terminal/src';
import defaultTheme from './themes/default';
import CommandInput from './input/CommandInput';
import OutputList from './OutputList';
import TerminalContainer from './TerminalContainer';
import defaultRenderers from './output';

class TerminalStateless extends Component {
  constructor({emulatorState}) {
    super();

    this.emulator = new Emulator();
    this.historyKeyboardPlugin = new HistoryKeyboardPlugin(emulatorState);
    this.plugins = [this.historyKeyboardPlugin];
    this.inputRef = null;
    this.containerRef = null;
    this.dragStart = {};
    this.dragging = false;
  }

  focus() {
    if (this.inputRef) {
      this.inputRef.focus();
    }
  }

  scrollOutput() {
    this.containerRef.scrollTop = this.containerRef.scrollHeight;
  }

  componentDidUpdate() {
    const {autoFocus} = this.props;
    
    this.scrollOutput();

    if (autoFocus) {
      this.focus();
    }
  }

  _submitInput = (commandStr) => {
    const {onStateChange, emulatorState} = this.props;
    const newState = this.emulator.execute(
      emulatorState, commandStr, this.plugins
    );

    onStateChange(newState, commandStr);
  }

  _setInput(inputStr) {
    const {onInputChange} = this.props;

    onInputChange(inputStr);
  }

  _onInputKeyDownEvent = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        this._setInput(this.historyKeyboardPlugin.completeUp());
        break;

      case 'ArrowDown':
        e.preventDefault();
        this._setInput(this.historyKeyboardPlugin.completeDown());
        break;

      case 'Tab':
        e.preventDefault();

        const autoCompletedStr = this.emulator.autocomplete(
          this.props.emulatorState, this.props.inputStr
        );

        this._setInput(autoCompletedStr);
        break;
      default:
        break;
    }
  }

  _onClick = () => {
    if (this.inputRef && !this.dragging) {
      this.scrollOutput();
      this.inputRef.focus();
    }
  };

  _onMouseDown = (e) => {
    this.dragging = false;
    this.dragStart = {
      x: e.screenX,
      y: e.screenY
    };
  }

  _onMouseUp = (e) => {
    if (this.dragStart.x === e.screenX && this.dragStart.y === e.screenY) {
      this.dragging = false;
    } else {
      // For the next 100ms consider any click event to be part of this drag.
      this.dragging = true;
      setTimeout(() => { this.isDragging = false; }, 100, this);
    }
  }

  render() {
    const {
      acceptInput, clickToFocus, emulatorState, inputStr, theme, promptSymbol, promptPath, outputRenderers, terminalId
    } = this.props;
    let inputControl, focusProps;

    if (!emulatorState) {
      return null;
    }

    if (clickToFocus) {
      focusProps = {
        onClick: this._onClick,
        onMouseDown: this._onMouseDown,
        onMouseUp: this._onMouseUp
      };
    }

    if (acceptInput) {
      inputControl = (
        <CommandInput
          ref={(ref) => { this.inputRef = ref; }}
          promptSymbol={promptSymbol}
          promptPath={promptPath}
          value={inputStr}
          onSubmit={this._submitInput}
          onKeyDown={this._onInputKeyDownEvent}
          onChange={(e) => this._setInput(e.target.value)}
        />
      );
    }

    return (
      <ThemeProvider theme={theme}>
        <TerminalContainer
          className={'terminalContainer'}
          ref={(ref) => { this.containerRef = ref; }}
          {...focusProps}
        >
          <OutputList
            terminalId={terminalId}
            promptSymbol={promptSymbol}
            outputRenderers={outputRenderers}
            outputs={emulatorState.getOutputs()}
          />
          {inputControl}
        </TerminalContainer>
      </ThemeProvider>
    );
  }
};

// These props are shared with ReactTerminal.
TerminalStateless.commonPropTypes = {
  acceptInput: PropTypes.bool,
  autoFocus: PropTypes.bool,
  clickToFocus: PropTypes.bool,
  outputRenderers: PropTypes.object,
  promptSymbol: PropTypes.string,
  promptPath: PropTypes.string,
  terminalId: PropTypes.string,
  theme: PropTypes.object
};

TerminalStateless.propTypes = {
  ...TerminalStateless.commonPropTypes,
  emulatorState: PropTypes.object.isRequired,
  inputStr: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onStateChange: PropTypes.func.isRequired
};

TerminalStateless.defaultProps = {
  acceptInput: true,
  autoFocus: true,
  clickToFocus: false,
  emulatorState: EmulatorState.createEmpty(),
  inputStr: '',
  outputRenderers: defaultRenderers,
  promptSymbol: 'wesley:~',
  promptPath: '',
  terminalId: 'terminal01',
  theme: defaultTheme
};

export default TerminalStateless;
