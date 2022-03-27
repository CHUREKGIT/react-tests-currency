import { convertPLNToUSD } from './../convertPLNtoUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });
  it('should return Nan when input is text', () => {
    expect(convertPLNToUSD('1')).toBeNaN();
    expect(convertPLNToUSD('siemka')).toBeNaN();
    expect(convertPLNToUSD('')).toBeNaN();
    expect(convertPLNToUSD('.')).toBeNaN();
    expect(convertPLNToUSD(undefined)).toBeNaN();
  });
  it('should return Error when input is not text and not number', () => {
    expect(convertPLNToUSD(null)).toBe('Error');
    expect(convertPLNToUSD(true)).toBe('Error');
  });
  it('should return 0,00$ when input is lower than 0', () => {
    expect(convertPLNToUSD(-1)).toBe('$0.00');
    expect(convertPLNToUSD(-2)).toBe('$0.00');
    expect(convertPLNToUSD(-12)).toBe('$0.00');
  });
});