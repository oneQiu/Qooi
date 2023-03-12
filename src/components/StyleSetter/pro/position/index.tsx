import * as React from 'react';
import Row from '../../components/row';
import { InputNumber } from 'antd';
import { useEffect } from 'react';
import PositionBox from './positionBox';
import { StyleData, onStyleChange } from '../../utils/types';
import positionConfig from './config.json';

interface layoutProps {
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  positionPropsConfig?: any;
}

export default (props: layoutProps) => {
  const { float, clear, position }: any = positionConfig;

  const { onStyleChange, styleData, positionPropsConfig } = props;

  const { isShowFloat, isShowClear } = positionPropsConfig;

  const onZIndexChange = (zIndex: number) => {
    onStyleChange([{ styleKey: 'zIndex', value: zIndex }]);
  };

  const initData = () => {};

  useEffect(() => {
    initData();
  }, []);

  return (
    <div>
      <Row
        title={position.title}
        dataList={position.dataList}
        styleData={styleData}
        styleKey="position"
        onStyleChange={(val) => {
          onStyleChange(val);
        }}
      />
      {styleData['position'] && styleData['position'] != 'static' && <PositionBox {...props} />}

      <Row title={'层级'} styleData={styleData} styleKey="zIndex">
        <InputNumber
          step={1}
          placeholder="默认"
          size="small"
          onChange={onZIndexChange}
          value={styleData['zIndex']}
        />
      </Row>

      {isShowFloat && (
        <Row
          title={float.title}
          dataList={float.dataList}
          onStyleChange={onStyleChange}
          styleData={styleData}
          styleKey="float"
        />
      )}
      {isShowClear && (
        <Row
          title={clear.title}
          dataList={clear.dataList}
          onStyleChange={onStyleChange}
          styleData={styleData}
          styleKey="clear"
        />
      )}
    </div>
  );
};
