'use client';

import { InputGroup } from './input-group';
import { getPasswordScore } from '@/lib/helpers/utils';
import {
  Box,
  HStack,
  IconButton,
  Input,
  mergeRefs,
  Stack,
  useControllableState,
} from '@chakra-ui/react';
import * as React from 'react';
import { useRef } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';

export const PasswordInput = React.forwardRef(
  function PasswordInput(props, ref) {
    const {
      rootProps,
      defaultVisible,
      visible: visibleProp,
      onVisibleChange,
      visibilityIcon = { on: <LuEye />, off: <LuEyeOff /> },
      ...rest
    } = props;

    const [visible, setVisible] = useControllableState({
      value: visibleProp,
      defaultValue: defaultVisible || false,
      onChange: onVisibleChange,
    });

    const inputRef = useRef(null);

    return (
      <InputGroup
        width='full'
        endElement={
          <VisibilityTrigger
            disabled={rest.disabled}
            onPointerDown={(e) => {
              if (rest.disabled) return;
              if (e.button !== 0) return;
              e.preventDefault();
              setVisible(!visible);
            }}
          >
            {visible ? visibilityIcon.off : visibilityIcon.on}
          </VisibilityTrigger>
        }
        {...rootProps}
      >
        <Input
          {...rest}
          css={{ '--focus-color': 'blue' }}
          placeholder=''
          variant='outline'
          ref={mergeRefs(ref, inputRef)}
          type={visible ? 'text' : 'password'}
          className='peer'
        />
      </InputGroup>
    );
  },
);

const VisibilityTrigger = React.forwardRef(
  function VisibilityTrigger(props, ref) {
    return (
      <IconButton
        tabIndex={-1}
        ref={ref}
        me='-2'
        aspectRatio='square'
        size='sm'
        variant='ghost'
        height='calc(100% - {spacing.2})'
        aria-label='Toggle password visibility'
        {...props}
      />
    );
  },
);

export const PasswordStrengthMeter = React.forwardRef(
  function PasswordStrengthMeter(props, ref) {
    const { password, ...rest } = props;
    const { label, colorPalette } = getColorPalette(password);

    return (
      <Stack align='flex-end' gap='1' ref={ref} {...rest}>
        <HStack width='full' ref={ref} {...rest}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Box
              key={index}
              height='1'
              flex='1'
              rounded='sm'
              data-selected={
                index < getPasswordScore(password).score ? '' : undefined
              }
              layerStyle='fill.subtle'
              colorPalette='gray'
              _selected={{
                colorPalette,
                layerStyle: 'fill.solid',
              }}
            />
          ))}
        </HStack>
        {label && <HStack textStyle='xs'>{label}</HStack>}
      </Stack>
    );
  },
);

function getColorPalette(password) {
  const { score } = getPasswordScore(password);

  switch (score) {
    case 1:
      return { label: 'Very Low', colorPalette: 'red' };
    case 2:
      return { label: 'Low', colorPalette: 'orange' };
    case 3:
      return { label: 'Medium', colorPalette: 'yellow' };
    case 4:
      return { label: 'Good', colorPalette: 'blue' };
    case 5:
      return { label: 'High', colorPalette: 'green' };
    default:
      return { label: '', colorPalette: 'gray' };
  }
}
