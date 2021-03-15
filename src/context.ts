import React from 'react';
import { TfnValidatorServiceInterface } from './services/TfnValidatorServiceInterface';

const throwOnNoValue: TfnValidatorServiceInterface = {
  isTaxFileNumberValid: () => {
    throw new Error("Invalid configuration");
  },
};

export const TfnValidationServiceContext = React.createContext<TfnValidatorServiceInterface>(
  throwOnNoValue
);
