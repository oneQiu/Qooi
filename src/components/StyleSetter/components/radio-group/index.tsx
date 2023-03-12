import * as React from 'react';
import { RadioItem, onStyleChange } from '../../utils/types';
import { Segmented, Tooltip } from 'antd';
import Icon from '../icon';
import './index.less';

interface radioProps {
  dataList?: Array<RadioItem>;
  styleKey: string;
  // styleData?: StyleData | any;
  onStyleChange?: onStyleChange;
  // 某些时候值并不是直接从StyleData中获取的，value值提供了外部定义的扩展
  value: string;
}

export default (props: radioProps) => {
  const { dataList = [], styleKey, onStyleChange = () => {}, value } = props;

  const onSegmented = (val) => {
    onStyleChange([
      {
        styleKey,
        value: val === '' ? null : val,
      },
    ]);
  };

  return (
    <Segmented
      value={value ?? ''}
      onChange={(val) => onSegmented(val)}
      options={[{ title: ' - ', tips: '清空当前设置', value: '' }, ...dataList].map(
        ({ value, icon, title, tips }) => {
          const option = {
            label: (
              <Tooltip title={tips}>
                <span>{icon ? <Icon type={icon} size="small" /> : title}</span>
              </Tooltip>
            ),
            value,
          };
          return option;
        },
      )}
    />
  );
};
