import ResultBox from './ResultBox';
import {render, screen, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';



  describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
  });
    it("should render proper info about conversion when PLN -> USD", () => {

        const testCases = [
            { amount: '100', from: 'PLN', to: 'USD' },
            { amount: '20', from: 'PLN', to: 'USD' },
            { amount: '200', from: 'PLN', to: 'USD' },
            { amount: '345', from: 'PLN', to: 'USD' },
      ];
        for(const testObj of testCases) {

        render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
        const mainDiv = screen.getByTestId('main-div');
        let result = parseInt(testObj.amount) / 3.5
        let roundedResult = Math.round(result * 100) / 100
        let finalText = testObj.from + ' ' + testObj.amount + '.00 = $' +roundedResult
        expect(mainDiv).toHaveTextContent(finalText);
        // unmount component
        cleanup()
        }
    })
    it("should render proper info about conversion when USD -> PLN", () => {

        const testCases = [
            { amount: '100', from: 'USD', to: 'PLN' },
            { amount: '20', from: 'USD', to: 'PLN' },
            { amount: '200', from: 'USD', to: 'PLN' },
            { amount: '255', from: 'USD', to: 'PLN' },
      ];
        for(const testObj of testCases) {

        render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
        const mainDiv = screen.getByTestId('main-div');
        let result = parseInt(testObj.amount) * 3.5
        let roundedResult = Math.round(result * 100) / 100
        let finalText = '$' + testObj.amount + '.00 = PLN ' +roundedResult
        expect(mainDiv).toHaveTextContent(finalText);
        // unmount component
        cleanup()
        }
    })
    it("should render proper info about conversion when PLN -> PLN", () => {

        const testCases = [
            { amount: '100', from: 'PLN', to: 'PLN' },
            { amount: '200', from: 'PLN', to: 'PLN' },
      ];
    
        for(const testObj of testCases) {

        render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
        const mainDiv = screen.getByTestId('main-div');
        let finalText = 'PLN ' + testObj.amount + '.00 = PLN ' +testObj.amount+'.00'
        expect(mainDiv).toHaveTextContent(finalText);
        // unmount component
        cleanup()
        }
    })
    it("should render Wrong Value when value is less than 0", () => {

        const testCases = [
            { amount: '-100', from: 'PLN', to: 'USD' },
            { amount: '-200', from: 'PLN', to: 'PLN' },
      ];
    
        for(const testObj of testCases) {

        render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
        const mainDiv = screen.getByTestId('main-div');
        let finalText = 'Wrong Value...'
        expect(mainDiv).toHaveTextContent(finalText);
        // unmount component
        cleanup()
        }

    })
});