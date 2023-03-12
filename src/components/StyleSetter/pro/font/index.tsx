import * as React from 'react';
import Row from '../../components/row';
import Number from '../../components/number';
import { StyleData, onStyleChange } from '../../utils/types';
import { Select, Space, InputNumber } from 'antd';
import ColorInput from '../../components/color-input';
import fontConfig from './config.json';
import { addUnit, isEmptyValue, isNumber } from '../../utils';
import './index.less';

interface fontProps {
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  fontPropsConfig?: any;
  unit?: string;
}
export default (props: fontProps) => {
  const { styleData, onStyleChange = () => {}, fontPropsConfig } = props;
  const defaultFontPropsConfig = {
    // display 展示列表
    fontFamilyList: [
      { value: 'Helvetica', label: 'Helvetica' },
      { value: 'Arial', label: 'Arial' },
      { value: 'serif', label: 'serif' },
    ],
  };

  // 配置合并
  const propsConfig = { ...defaultFontPropsConfig, ...fontPropsConfig };

  const { fontWeight, textAlign }: any = fontConfig;

  const onNumberChange = (styleKey: string, value: number | null, unit?: string) => {
    onStyleChange([
      {
        styleKey,
        value: unit && isNumber(value) ? addUnit(value as number, unit) : value,
      },
    ]);
  };

  return (
    <div className="flyfox-font-style-container">
      <div className="inner-row-container">
        <div className="row-item">
          <span className="row-item-title">字号</span>
          <Number max={100} min={0} styleKey="fontSize" {...props} />
        </div>
        <div className="row-item">
          <span className="row-item-title">行高</span>
          <Number min={0} styleKey="lineHeight" {...props} style={{ width: '100%' }} />
        </div>
      </div>
      <Row title={'字重'} styleData={styleData} styleKey="">
        <Select
          options={fontWeight.dataList}
          style={{ width: '100%' }}
          placeholder="请选择"
          size="small"
          value={styleData.fontWeight}
          allowClear={true}
          onChange={(val) => onStyleChange([{ styleKey: 'fontWeight', value: val }])}
        />
      </Row>
      <Row title={'字体'} styleData={styleData} styleKey="">
        <Select
          options={propsConfig.fontFamilyList}
          style={{ width: '100%' }}
          value={styleData.fontFamily}
          placeholder="请选择"
          size="small"
          allowClear={true}
          onChange={(val) => onStyleChange([{ styleKey: 'fontFamily', value: val }])}
        />
      </Row>

      <Row title={'文字颜色'} styleKey="" {...props}>
        <ColorInput styleKey={'color'} {...props} inputWidth="100%" />
      </Row>

      <Row title={textAlign.title} dataList={textAlign.dataList} styleKey="textAlign" {...props} />

      <Row title={'透明度'} styleKey="opacity" {...props}>
        <InputNumber
          value={!isEmptyValue(styleData.opacity) ? Math.floor(styleData.opacity * 100) : undefined}
          size="small"
          max={100}
          style={{ width: 100 }}
          addonAfter="%"
          min={0}
          onChange={(val) =>
            onNumberChange('opacity', isEmptyValue(val) ? null : (val as number) / 100)
          }
        />
      </Row>
    </div>
  );
};
