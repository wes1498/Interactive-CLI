import React from 'react';
import PropTypes from 'prop-types';
import PromptSymbol from '../PromptSymbol';
import OutputContainer from './OutputContainer';
import TextCommandWrapper from './TextCommandWrapper';

const HeaderOutput = ({ content, promptSymbol }) => (
  <OutputContainer>
    <PromptSymbol>{promptSymbol}</PromptSymbol><TextCommandWrapper>{content.command}</TextCommandWrapper>
  </OutputContainer>
);

HeaderOutput.propTypes = {
  content: PropTypes.object.isRequired,
  promptSymbol: PropTypes.string.isRequired
};

export default HeaderOutput;
