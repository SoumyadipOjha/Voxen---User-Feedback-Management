import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    pink: {
      50: '#fef7f7',
      100: '#fdf2f2',
      200: '#fce5e5',
      300: '#fac9c9',
      400: '#f5a3a3',
      500: '#ec7979',
      600: '#e53e3e',
      700: '#c53030',
      800: '#9b2c2c',
      900: '#742a2a',
    },
    brand: {
      50: '#fff5f8',
      100: '#fed7e2',
      200: '#fbb6ce',
      300: '#f687b3',
      400: '#ed64a6',
      500: '#d53f8c',
      600: '#b83280',
      700: '#97266d',
      800: '#702459',
      900: '#521b41',
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'lg',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            transform: 'translateY(-1px)',
          },
          _active: {
            bg: 'brand.700',
            transform: 'translateY(0)',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          border: '1px solid',
          borderColor: 'gray.200',
          bg: 'white',
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: 'gray.50',
            borderRadius: 'lg',
            border: '1px solid',
            borderColor: 'gray.200',
            _hover: {
              bg: 'gray.100',
            },
            _focus: {
              bg: 'white',
              borderColor: 'brand.500',
            },
          },
        },
      },
      defaultProps: {
        variant: 'filled',
      },
    },
    Textarea: {
      variants: {
        filled: {
          bg: 'gray.50',
          borderRadius: 'lg',
          border: '1px solid',
          borderColor: 'gray.200',
          _hover: {
            bg: 'gray.100',
          },
          _focus: {
            bg: 'white',
            borderColor: 'brand.500',
          },
        },
      },
      defaultProps: {
        variant: 'filled',
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
});