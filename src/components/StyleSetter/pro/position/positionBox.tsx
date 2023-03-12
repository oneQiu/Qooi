import * as React from 'react';
import { InputNumber } from 'antd';
import { StyleData, onStyleChange } from '../../utils/types';
import positionConfig from './config.json';
import Row from '../../components/row';
import { addUnit, isNumber, removeUnit } from '../../utils';
import './index.less';

interface positionBoxProps {
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  unit?: 'px';
}

export default (props: positionBoxProps) => {
  const { onStyleChange, styleData, unit = 'px' } = props;
  const { positionTemplate }: any = positionConfig;

  const onInputChange = (styleKey: string, value: number | null) => {
    onStyleChange([
      {
        styleKey,
        value: isNumber(value) ? addUnit(value as number, unit) : null,
      },
    ]);
  };

  const onPositionTemplateChange = (styleDataList: Array<StyleData>) => {
    // 解析模板的值
    styleDataList.map((item) => {
      if (item.value == 'topLeft') {
        onStyleChange([
          {
            styleKey: 'top',
            value: 0,
          },
          {
            styleKey: 'left',
            value: 0,
          },
          {
            styleKey: 'bottom',
            value: null,
          },
          {
            styleKey: 'right',
            value: null,
          },
        ]);
      } else if (item.value === 'topRight') {
        onStyleChange([
          {
            styleKey: 'top',
            value: 0,
          },
          {
            styleKey: 'left',
            value: null,
          },
          {
            styleKey: 'bottom',
            value: null,
          },
          {
            styleKey: 'right',
            value: 0,
          },
        ]);
      } else if (item.value === 'bottomLeft') {
        onStyleChange([
          {
            styleKey: 'top',
            value: null,
          },
          {
            styleKey: 'left',
            value: 0,
          },
          {
            styleKey: 'bottom',
            value: 0,
          },
          {
            styleKey: 'right',
            value: null,
          },
        ]);
      } else if (item.value === 'bottomRight') {
        onStyleChange([
          {
            styleKey: 'top',
            value: null,
          },
          {
            styleKey: 'left',
            value: null,
          },
          {
            styleKey: 'bottom',
            value: 0,
          },
          {
            styleKey: 'right',
            value: 0,
          },
        ]);
      }
      return item;
    });
  };

  return (
    <div>
      {styleData['position'] && styleData['position'] === 'absolute' && (
        <Row
          dataList={positionTemplate.dataList}
          onStyleChange={onPositionTemplateChange}
          styleKey={'positionTemplate'}
        />
      )}

      <div className="position-box-container">
        <div className="top-div">
          <InputNumber
            controls={false}
            bordered={false}
            maxLength={4}
            placeholder="自动"
            value={removeUnit(styleData['top'])}
            onChange={(val) => onInputChange('top', val)}
          />
        </div>
        <div className="right-div">
          <InputNumber
            controls={false}
            bordered={false}
            maxLength={4}
            placeholder="自动"
            value={removeUnit(styleData['right'])}
            onChange={(val) => onInputChange('right', val)}
          />
        </div>
        <div className="bottom-div">
          <InputNumber
            controls={false}
            bordered={false}
            maxLength={4}
            placeholder="自动"
            value={removeUnit(styleData['bottom'])}
            onChange={(val) => onInputChange('bottom', val)}
          />
        </div>
        <div className="left-div">
          <InputNumber
            controls={false}
            bordered={false}
            maxLength={4}
            placeholder="自动"
            value={removeUnit(styleData['left'])}
            onChange={(val) => onInputChange('left', val)}
          />
        </div>
      </div>
    </div>
  );
};
