import '@testing-library/jest-dom';

import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

jest.mock('@iconify/react', () => ({
  Icon: ({ icon, className, onClick, ...props }: any) => {
    const MockIcon = require('react').createElement('div', {
      className: `iconify-mock ${className || ''}`,
      'data-icon': icon,
      onClick,
      ...props
    });
    return MockIcon;
  }
}));
