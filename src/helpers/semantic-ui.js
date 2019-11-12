import { Responsive } from 'semantic-ui-react';

export const getWidth = () => {
  return Responsive.onlyTablet.minWidth;
};

export const transformObjectToSemanticUiPayload = rawRates =>
  Object.keys(rawRates).map(key => ({
    text: key,
    value: key,
    key
  }));
