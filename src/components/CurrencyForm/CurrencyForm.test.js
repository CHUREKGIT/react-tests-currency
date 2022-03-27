import { render, screen, cleanup } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';


describe('Component CurrencyForm', () => {
  it('should render without crashing', () => {
        render(<CurrencyForm action={() => {}} />);
  });
  it('should run action callback with proper data on form submit', () => {
    const testCases = [
        { amount: '100', from: 'PLN', to: 'USD' },
        { amount: '20', from: 'USD', to: 'PLN' },
        { amount: '200', from: 'PLN', to: 'USD' },
        { amount: '345', from: 'USD', to: 'PLN' },
  ];

    for(const testObj of testCases) {
        const action = jest.fn();
        // render component
        render(<CurrencyForm action={action} />);

         // find “convert” button
        const submitButton = screen.getByText('Convert');

        // set test values to fields
        const amount = screen.getByTestId('amount');
        const fromCurrency = screen.getByTestId('from-select');
        const toCurrency = screen.getByTestId('to-select');

        userEvent.type(amount, testObj.amount);
        userEvent.selectOptions(fromCurrency, testObj.from);
        userEvent.selectOptions(toCurrency, testObj.to);

        // simulate user click on "convert" button
        userEvent.click(submitButton);

        // check if action callback was called once
        expect(action).toHaveBeenCalledTimes(1);
        expect(action).toHaveBeenCalledWith({ amount: parseInt(testObj.amount), from: testObj.from, to: testObj.to});

        // unmount component
        cleanup()
    }
});
});