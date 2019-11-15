import { Responsive } from 'semantic-ui-react';

const { onlyTablet } = Responsive;

export const getMaxWidth = () => {
  return onlyTablet.maxWidth;
};

export const getMinWidth = () => {
  return onlyTablet.minWidth;
};

export const transformObjectToSemanticUiPayload = rawRates =>
  Object.keys(rawRates).map(key => ({
    text: key,
    value: key,
    key
  }));
