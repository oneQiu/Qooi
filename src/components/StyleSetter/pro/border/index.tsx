import * as React from 'react';
import { useState, useEffect, Fragment } from 'react';
import Row from '../../components/row';
import Icon from '../../components/icon';
import Number from '../../components/number';
import ColorInput from '../../components/color-input';
import { StyleData, onStyleChange } from '../../utils/types';
import { Select, Space, Col, Row as AntdRow } from 'antd';
import fontConfig from './config.json';
import { addUnit, removeUnit } from '../../utils';
import './index.less';

const BORDER_MAX = 30;

enum BorderRadiusType {
  fixedBorder = 'fixedBorder',
  partBorder = 'partBorder',
}

const BorderDirectionMap = {
  borderLeft: 'borderLeft',
  borderRight: 'borderRight',
  borderTop: 'borderTop',
  borderBottom: 'borderBottom',
  // border:'border'
};

const borderRadiusMap = {
  borderRadius: 'borderRadius',
  borderTopLeftRadius: 'borderTopLeftRadius',
  borderTopRightRadius: 'borderTopRightRadius',
  borderBottomLeftRadius: 'borderBottomLeftRadius',
  borderBottomRightRadius: 'borderBottomRightRadius',
};

interface fontProps {
  styleData: StyleData | any;
  onStyleChange?: onStyleChange;
  unit?: string;
}
export default (props: fontProps) => {
  const { styleData, onStyleChange = () => {}, unit } = props;
  const { borderType, borderStyle }: any = fontConfig;
  const [selBorderType, setSelBorderType] = useState<any>(null);
  const [borderDirection, setBorderDirection] = useState<any>(null);

  useEffect(() => {
    if (!borderDirection) {
      for (let key in styleData) {
        for (let borderDirectionKey in BorderDirectionMap) {
          if (key.indexOf(borderDirectionKey) >= 0) {
            setBorderDirection(borderDirectionKey);
            break;
          }
          if (styleData['border']) {
            setBorderDirection('border');
            break;
          }
        }
      }
    }

    // 判断圆角类型
    if (styleData[borderRadiusMap.borderRadius]) {
      setSelBorderType(BorderRadiusType.fixedBorder);
    } else if (
      styleData[borderRadiusMap.borderBottomLeftRadius] ||
      styleData[borderRadiusMap.borderBottomRightRadius] ||
      styleData[borderRadiusMap.borderTopLeftRadius] ||
      styleData[borderRadiusMap.borderTopRightRadius]
    ) {
      setSelBorderType(BorderRadiusType.partBorder);
    }
  }, [styleData]);

  const onChangeBorderType = (styleDataList: Array<StyleData>) => {
    if (styleDataList) {
      const styleKey = styleDataList[0].value;
      setSelBorderType(styleKey);
    }
  };

  const onRangeChange = (styleKey: string, value: string, unit?: string) => {
    // 需要清除partBorder的圆角设置，不然会冲突，容易遗漏

    onStyleChange([
      {
        styleKey,
        value: unit ? addUnit(value, unit) : value,
      },
      {
        styleKey: borderRadiusMap.borderBottomLeftRadius,
        value: null,
      },
      {
        styleKey: borderRadiusMap.borderBottomRightRadius,
        value: null,
      },
      {
        styleKey: borderRadiusMap.borderTopLeftRadius,
        value: null,
      },
      {
        styleKey: borderRadiusMap.borderTopRightRadius,
        value: null,
      },
    ]);
  };

  const onIconClick = (styleKey: string) => {
    setBorderDirection(styleKey);
  };

  const onPartBorderRadiusChange = (
    styleKey: string,
    value: number,
    unit: string,
    styleData: any,
  ) => {
    let styleDataList = [
      {
        styleKey,
        value: unit ? addUnit(value, unit) : value,
      },
    ];
    if (styleData['borderRadius']) {
      styleDataList.push({
        styleKey: 'borderRadius',
        value: null,
      });
    }
    onStyleChange(styleDataList);
  };

  const onBorderTypeChange = (styleKey: string, value: string) => {
    onStyleChange([
      {
        styleKey,
        value,
      },
    ]);
  };

  return (
    <div className="border-style-container">
      <Row
        title={borderType.title}
        dataList={borderType.dataList}
        styleKey={'borderType'}
        {...props}
        onStyleChange={onChangeBorderType}
        value={selBorderType}
      />

      {selBorderType == 'fixedBorder' && (
        <Row title={' '} styleKey="borderRadius" {...props}>
          <div className="radius-container">
            <Number
              styleKey="borderRadius"
              style={{ minWidth: '80px', marginLeft: '5px' }}
              {...props}
              max={BORDER_MAX}
            />
          </div>
        </Row>
      )}

      {selBorderType == 'partBorder' && (
        <AntdRow>
          <Col span={12} className="row-item">
            <Icon type="icon-radius-upleft" className="radius-icon" />
            <Number
              max={BORDER_MAX}
              min={0}
              styleKey={borderRadiusMap.borderTopLeftRadius}
              {...props}
              onChangeFunction={(styleKey, val, unit) =>
                onPartBorderRadiusChange(styleKey, val, unit, styleData)
              }
            />
          </Col>
          <Col span={12} className="row-item">
            <Icon type="icon-radius-upright" className="radius-icon" />
            <Number
              max={BORDER_MAX}
              styleKey={borderRadiusMap.borderTopRightRadius}
              {...props}
              onChangeFunction={(styleKey, val, unit) =>
                onPartBorderRadiusChange(styleKey, val, unit, styleData)
              }
            />
          </Col>
          <Col span={12} className="row-item">
            <Icon type="icon-radius-bottomleft" className="radius-icon" />
            <Number
              max={BORDER_MAX}
              styleKey={borderRadiusMap.borderBottomLeftRadius}
              {...props}
              onChangeFunction={(styleKey, val, unit) =>
                onPartBorderRadiusChange(styleKey, val, unit, styleData)
              }
            />
          </Col>
          <Col span={12} className="row-item">
            <Icon type="icon-radius-bottomright" className="radius-icon" />
            <Number
              max={BORDER_MAX}
              styleKey={borderRadiusMap.borderBottomRightRadius}
              {...props}
              onChangeFunction={(styleKey: string, val: number, unit: string) =>
                onPartBorderRadiusChange(styleKey, val, unit, styleData)
              }
            />
          </Col>
        </AntdRow>
      )}

      <Row title={'边框'} styleKey="border" {...props}>
        <div className="border-container">
          <div className="border-icon-container">
            <div className="top-icon-container">
              <div
                className={
                  borderDirection === BorderDirectionMap.borderTop
                    ? 'sel-icon icon-container'
                    : 'icon-container'
                }
                onClick={() => onIconClick('borderTop')}
              >
                <Icon type="icon--shangbiankuang" />
              </div>
            </div>
            <div className="center-icon-container">
              <div
                className={
                  borderDirection === BorderDirectionMap.borderLeft
                    ? 'sel-icon icon-container'
                    : 'icon-container'
                }
                onClick={() => onIconClick('borderLeft')}
              >
                <Icon type="icon--zuobiankuang" />
              </div>

              <div
                className={
                  borderDirection === 'border' ? 'sel-icon icon-container' : 'icon-container'
                }
                onClick={() => onIconClick('border')}
              >
                <Icon type="icon--quanbubiankuang" />
              </div>
              <div
                className={
                  borderDirection === BorderDirectionMap.borderRight
                    ? 'sel-icon icon-container'
                    : 'icon-container'
                }
                onClick={() => onIconClick('borderRight')}
              >
                <Icon type="icon--youbiankuang" />
              </div>
            </div>
            <div className="bottom-icon-container">
              <div
                className={
                  borderDirection === BorderDirectionMap.borderBottom
                    ? 'sel-icon icon-container'
                    : 'icon-container'
                }
                onClick={() => onIconClick('borderBottom')}
              >
                <Icon type="icon--xiabiankuang" />
              </div>
            </div>
          </div>

          {borderDirection && (
            <Space direction="vertical" style={{ marginLeft: 15 }}>
              <Number min={0} max={30} styleKey={borderDirection + 'Width'} {...props} />
              <ColorInput styleKey={borderDirection + 'Color'} {...(props as any)} />
              <Select
                allowClear
                style={{ width: '100%' }}
                size="small"
                value={styleData[borderDirection + 'Style']}
                onChange={(value) => {
                  onBorderTypeChange(borderDirection + 'Style', value);
                }}
                options={[
                  {
                    label: '直线',
                    value: 'solid',
                  },
                  {
                    label: '虚线',
                    value: 'dashed',
                  },
                  {
                    label: '双点线',
                    value: 'dotted',
                  },
                ]}
              />
            </Space>
          )}
        </div>
      </Row>
    </div>
  );
};
