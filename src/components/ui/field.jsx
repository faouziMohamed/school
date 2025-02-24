import {
  Box,
  defineStyle,
  Field as ChakraField,
  Input as ChakraInput,
} from '@chakra-ui/react';
import * as React from 'react';

export const Field = React.forwardRef(function Field(props, ref) {
  const { label, children, helperText, errorText, optionalText, ...rest } =
    props;
  return (
    <ChakraField.Root ref={ref} {...rest}>
      <Box position='relative' w='full'>
        {children}
        {label && (
          <ChakraField.Label css={floatingStyles}>
            {label}
            <ChakraField.RequiredIndicator fallback={optionalText} />
          </ChakraField.Label>
        )}
      </Box>
      {helperText && (
        <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
      )}
      {errorText && <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>}
    </ChakraField.Root>
  );
});

export const Input = React.forwardRef(function Input(props, ref) {
  return (
    <ChakraInput
      ref={ref}
      className='peer'
      css={{ '--focus-color': 'blue' }}
      placeholder=''
      variant='outline'
      {...props}
    />
  );
});

const floatingStyles = defineStyle({
  pos: 'absolute',
  bg: 'bg',
  px: '0.5',
  top: '-3',
  insetStart: '2',
  fontWeight: 'normal',
  pointerEvents: 'none',
  transition: 'position',
  _peerPlaceholderShown: {
    color: 'fg.muted',
    top: '2.5',
    insetStart: '3',
  },
  _peerFocusVisible: {
    color: 'gray.500',
    top: '-3',
    insetStart: '2',
    fontWeight: '500',
  },
});

export const UiField = React.forwardRef(function UiField(props, ref) {
  const { label, children, helperText, errorText, optionalText, ...rest } =
    props;
  return (
    <ChakraField.Root ref={ref} {...rest}>
      {label && (
        <ChakraField.Label>
          {label}
          <ChakraField.RequiredIndicator fallback={optionalText} />
        </ChakraField.Label>
      )}
      {children}
      {helperText && (
        <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
      )}
      {errorText && <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>}
    </ChakraField.Root>
  );
});
