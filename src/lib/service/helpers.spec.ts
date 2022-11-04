import { getAttack, parseAttack } from './helpers';

describe('helpers tests', (): void => {
  test('parse attack', () => {
    const [rolls, dices, modifier] = parseAttack('3d8+9');

    expect(rolls).toBe(3);
    expect(dices).toBe(8);
    expect(modifier).toBe(9);
  });

  test('invalid attack string throws an error', () => {
    expect(() => parseAttack('adb+c')).toThrowError('Invalid attack format');
  });

  test('fixed attack is properly calculated', () => {
    expect(getAttack('1d2+3')).toBe(5);
  });
});
