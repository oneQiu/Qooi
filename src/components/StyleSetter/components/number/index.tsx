import * as React from 'react';
import { InputNumber } from 'antd';
import { StyleData, onStyleChange } from '../../utils/types';
import { addUnit, removeUnit, isEmptyValue, unifyStyle } from '../../utils';

interface numberProps {
  styleKey: string;
  styleData: StyleData | any;
  onStyleChange?: onStyleChange;
  unit?: string;
  min?: number;
  max?: number;
  style?: any;
  className?: string;
  placeholderScale?: number;
  defaultPlaceholder?: string;
  onChangeFunction?: any;
  multiProp?: any; //属性值包含多项是的项序号
  before?: any;
}

export default (props: numberProps) => {
  const {
    styleData,
    styleKey,
    unit,
    onStyleChange = () => {},
    min,
    max,
    style = {},
    className = '',
    onChangeFunction,
    before,
    multiProp,
    defaultPlaceholder,
  } = props;

  const onNumberChange = (styleKey: string, value: number, unit?: string) => {
    onStyleChange([
      {
        styleKey,
        value: unit ? addUnit(value, unit) : value,
      },
    ]);
  };

  let value = unit ? removeUnit(styleData[styleKey]) : styleData[styleKey];

  // 不加multiprop一样，加了单独处理
  if (typeof multiProp === 'number') {
    value = unifyStyle(styleData[styleKey])?.split(' ')?.[multiProp];
    if (value === null || value === undefined || value === 'auto') {
      value = null;
    } else {
      value = unit ? removeUnit(value) : value;
    }
  }

  return (
    <InputNumber
      style={style}
      className={className}
      size="small"
      value={value}
      min={isEmptyValue(min) ? Number.MIN_SAFE_INTEGER : min}
      max={isEmptyValue(max) ? Number.MAX_SAFE_INTEGER : max}
      onChange={(val) =>
        onChangeFunction
          ? onChangeFunction(styleKey, val, unit)
          : onNumberChange(styleKey, val, unit)
      }
      addonBefore={before}
      addonAfter={unit ? unit : ''}
      placeholder={defaultPlaceholder ?? '自动'}
    />
  );
};
