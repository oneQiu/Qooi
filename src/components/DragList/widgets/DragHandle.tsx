import { Button, ButtonProps } from 'antd';
import React from 'react';
import { forwardRef } from 'react';

const DragHandle = forwardRef<ButtonProps, any>((props, ref) => {
  return (
    <Button ref={ref} {...props}>
      Drag Me
    </Button>
  );
});

export default DragHandle;
