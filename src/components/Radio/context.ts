import { ChangeEvent, createContext } from 'react';

type RadioGroupContextProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: any;
};

const RadioGroupContext = createContext<RadioGroupContextProps | null>(null);

export const RadioGroupContextProvider = RadioGroupContext.Provider;

export default RadioGroupContext;
