import { TextStyle } from 'react-native';

type TypeStyle = Pick<
  TextStyle,
  'fontFamily' | 'fontSize' | 'lineHeight' | 'letterSpacing' | 'fontWeight'
>;

const FONT = 'Geist';

export const textStyle = {
  displayLg: {
    fontFamily: FONT,
    fontSize: 48,
    lineHeight: 52,
    letterSpacing: -0.5,
    fontWeight: '700',
  } as TypeStyle,
  displaySm: {
    fontFamily: FONT,
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: -0.3,
    fontWeight: '700',
  } as TypeStyle,
  headingLg: {
    fontFamily: FONT,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.2,
    fontWeight: '600',
  } as TypeStyle,
  headingMd: {
    fontFamily: FONT,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.1,
    fontWeight: '600',
  } as TypeStyle,
  headingSm: {
    fontFamily: FONT,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
    fontWeight: '600',
  } as TypeStyle,
  bodyLg: {
    fontFamily: FONT,
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: 0,
    fontWeight: '400',
  } as TypeStyle,
  bodyMd: {
    fontFamily: FONT,
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0,
    fontWeight: '400',
  } as TypeStyle,
  bodySm: {
    fontFamily: FONT,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    fontWeight: '400',
  } as TypeStyle,
  labelLg: {
    fontFamily: FONT,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.1,
    fontWeight: '500',
  } as TypeStyle,
  labelSm: {
    fontFamily: FONT,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.2,
    fontWeight: '500',
  } as TypeStyle,
} as const;
