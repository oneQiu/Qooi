import * as React from 'react';
import { InputNumber } from 'antd';
import { StyleData, onStyleChange } from '../../utils/types';
import { addUnit, isNumber, removeUnit } from '../../utils';
import './index.less';

interface layoutBoxProps {
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  unit?: 'px';
  layoutPropsConfig: any;
}

export default (props: layoutBoxProps) => {
  const { onStyleChange, unit = 'px', styleData, layoutPropsConfig } = props;

  const onInputChange = (styleKey: string, value: number | null) => {
    console.log('onInputChange', styleKey, value);
    onStyleChange([
      {
        styleKey,
        value: isNumber(value) ? addUnit(value, unit) : null,
      },
    ]);
  };

  return (
    <div className="layout-box-container">
      {layoutPropsConfig.isShowMargin && (
        <>
          <div className="margin-top-div">
            <InputNumber
              placeholder="0"
              bordered={false}
              size="small"
              maxLength={4}
              controls={false}
              value={removeUnit(styleData['marginTop'])}
              onChange={(val) => onInputChange('marginTop', val)}
            />
          </div>
          <div className="margin-right-div">
            <InputNumber
              placeholder="0"
              bordered={false}
              size="small"
              maxLength={4}
              controls={false}
              value={removeUnit(styleData['marginRight'])}
              onChange={(val) => onInputChange('marginRight', val)}
            />
          </div>
          <div className="margin-bottom-div">
            <span className="help-txt">外边距</span>
            <InputNumber
              placeholder="0"
              bordered={false}
              size="small"
              maxLength={4}
              controls={false}
              value={removeUnit(styleData['marginBottom'])}
              onChange={(val) => onInputChange('marginBottom', val)}
            />
          </div>
          <div className="margin-left-div">
            <InputNumber
              placeholder="0"
              bordered={false}
              size="small"
              maxLength={4}
              controls={false}
              value={removeUnit(styleData['marginLeft'])}
              onChange={(val) => onInputChange('marginLeft', val)}
            />
          </div>
        </>
      )}

      {layoutPropsConfig.isShowPadding && (
        <>
          <div className="padding-top-div">
            <InputNumber
              className="next-noborder"
              placeholder="0"
              bordered={false}
              size="small"
              maxLength={4}
              controls={false}
              value={removeUnit(styleData['paddingTop'])}
              onChange={(val) => onInputChange('paddingTop', val)}
            />
          </div>
          <div className="padding-right-div">
            <InputNumber
              className="next-noborder"
              placeholder="0"
              bordered={false}
              size="small"
              maxLength={4}
              controls={false}
              value={removeUnit(styleData['paddingRight'])}
              onChange={(val) => onInputChange('paddingRight', val)}
            />
          </div>
          <div className="padding-bottom-div">
            <span className="help-txt">内边距</span>
            <InputNumber
              className="next-noborder"
              placeholder="0"
              bordered={false}
              size="small"
              maxLength={4}
              controls={false}
              value={removeUnit(styleData['paddingBottom'])}
              onChange={(val) => onInputChange('paddingBottom', val)}
            />
          </div>
          <div className="padding-left-div">
            <InputNumber
              className="next-noborder"
              placeholder="0"
              bordered={false}
              size="small"
              maxLength={4}
              controls={false}
              value={removeUnit(styleData['paddingLeft'])}
              onChange={(val) => onInputChange('paddingLeft', val)}
            />
          </div>
        </>
      )}
    </div>
  );
};
