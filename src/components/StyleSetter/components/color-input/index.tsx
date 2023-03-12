import { Input, Tooltip } from 'antd';
import { StyleData, onStyleChange } from '../../utils/types';
import { SketchPicker } from 'react-color';
import * as React from 'react';
import './index.less';

interface ColorInputProps {
  styleKey: string;
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  inputWidth?: string;
}

const ColorSetter: React.FC<ColorInputProps> = (props) => {
  const { styleKey, styleData, inputWidth = '108px' } = props;

  const inputChange = (e) => {
    const { onStyleChange, styleKey } = props;
    if (e.target.value == '') {
      onStyleChange([
        {
          styleKey,
          value: null,
        },
      ]);
    }
  };

  const onColorChange = (color: any) => {
    const { onStyleChange, styleKey } = props;
    const { rgb, hex } = color;
    const { r, g, b, a } = rgb;
    if (a === 1) {
      onStyleChange([
        {
          styleKey,
          value: hex,
        },
      ]);
    } else {
      onStyleChange([
        {
          styleKey,
          value: `rgba(${r},${g},${b},${a})`,
        },
      ]);
    }
  };

  return (
    <Tooltip
      color="none"
      title={<SketchPicker width={250} color={styleData[styleKey]} onChange={onColorChange} />}
    >
      <Input
        className="lowcode-setter-color"
        style={{ width: inputWidth }}
        size="small"
        allowClear
        addonBefore={<div className="color-box" style={{ backgroundColor: styleData[styleKey] }} />}
        onChange={inputChange}
        value={styleData[styleKey]}
      />
    </Tooltip>
  );
};

export default ColorSetter;
