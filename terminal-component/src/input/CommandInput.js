import React, { Component } from 'react';
import StyledInput from './StyledInput';
import StyledForm from './StyledForm';
import PromptSymbol from '../PromptSymbol';
import PropTypes from 'prop-types';

class CommandInput extends Component {
  focus() {
    this.input.focus();
  }

  render() {
    const { autoFocus, promptSymbol, value, onChange, onSubmit, onKeyDown, promptPath } = this.props;

    return (
      <div className={'terminalInput'}>
        <StyledForm
          onKeyDown={onKeyDown}
          onSubmit={e => {
            e.preventDefault();
            onSubmit(this.input.value);
          }}
        >
          <PromptSymbol>{promptSymbol + promptPath}</PromptSymbol>
          <StyledInput
            autoFocus={autoFocus}
            onChange={e => {
              e.persist();
              onChange(e);
            }}
            value={value}
            ref={ref => (this.input = ref)}
          />
        </StyledForm>
      </div>
    );
  }
};

CommandInput.propTypes = {
  autoFocus: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  promptSymbol: PropTypes.string.isRequired,
  promptPath: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default CommandInput;
