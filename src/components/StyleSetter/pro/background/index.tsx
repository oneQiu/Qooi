import * as React from 'react';
import { useState, useEffect, Fragment } from 'react';
import Row from '../../components/row';
import Icon from '../../components/icon';
import Number from '../../components/number';
import ColorInput from '../../components/color-input';
import { StyleData, onStyleChange } from '../../utils/types';
import { Input, InputNumber, Space } from 'antd';
import backgroundConfig from './config.json';
import { addUnit, parseValue, unifyStyle } from '../../utils';
import './index.less';
import { backgroundSizeMap } from './constant';
import { PictureOutlined } from '@ant-design/icons';

interface fontProps {
  styleData: StyleData | any;
  onStyleChange: onStyleChange;
  unit?: string;
}
export default (props: fontProps) => {
  const { onStyleChange = () => {}, styleData } = props;
  const { backgroundType, backgroundSize, backgroundPosition, backgroundRepeat }: any =
    backgroundConfig;
  const [bgType, setBgType] = useState<any>(null);
  const [bgSizeType, setBgSizeType] = useState<any>(null);
  const [bgRepeatType, setBgRepeatType] = useState<any>(null);
  const [bgPositionType, setBgPositionType] = useState<string>('');
  // 背景类型切换
  const onBgTypeChange = (styleDataList: Array<StyleData>) => {
    if (styleDataList) {
      setBgType(styleDataList[0].value);
    }
  };
  // 背景图片切换
  const onBgImageChange = (value: string) => {
    onStyleChange([
      {
        styleKey: 'backgroundImage',
        value: formatBgImgUrl(value),
      },
    ]);
  };
  // backgroundSize类型切换
  const onBgSizeTypeChange = (styleDataList: Array<StyleData>) => {
    const backgroundSize = 'backgroundSize';
    onStyleChange([
      {
        styleKey: backgroundSize,
        value: null,
      },
    ]);
    if (styleDataList) {
      const value = styleDataList[0]?.value;
      setBgSizeType(value);
      if (value != backgroundSizeMap.default) {
        onStyleChange([
          {
            styleKey: backgroundSize,
            value,
          },
        ]);
      }
    }
  };
  // backgroundSize值切换
  const onBgSizeChange = (
    styleKey: string,
    value: number,
    unit: string,
    styleData: any,
    direction: string,
  ) => {
    const bgSizeArray = styleData[styleKey]
      ? unifyStyle(styleData[styleKey])?.split(' ')
      : ['auto', 'auto'];
    const [width = 'auto', height = 'auto'] = bgSizeArray as string[];
    let styleDataList;
    if (styleData) {
      let unifiedValue = unit ? addUnit(value, unit) : value;
      if (unifiedValue === null || unifiedValue === undefined) unifiedValue = 'auto'; //空样式默认为auto
      if (direction === 'width') {
        styleDataList = [
          {
            styleKey,
            value:
              unifiedValue !== 'auto' || height !== 'auto' ? unifiedValue + ' ' + height : null, // 都为auto则删除样式
          },
        ];
      } else {
        styleDataList = [
          {
            styleKey,
            value: unifiedValue !== 'auto' || width !== 'auto' ? width + ' ' + unifiedValue : null,
          },
        ];
      }
      onStyleChange(styleDataList);
    }
  };
  // backgroundRepeat切换
  const onBgRepeatChange = (styleDataList: Array<StyleData>) => {
    if (styleDataList) {
      const value = styleDataList[0]?.value;
      setBgRepeatType(value);
      onStyleChange([
        {
          styleKey: 'backgroundRepeat',
          value,
        },
      ]);
    }
  };

  // backgroundPosition切换
  const onBgPositionChange = (value, direction) => {
    const unit = 'px';
    const styleKey = 'backgroundPosition';
    const bgSizeArray = styleData[styleKey]
      ? unifyStyle?.(styleData[styleKey])?.split(' ')
      : ['auto', 'auto'];
    const [width = 'auto', height = 'auto'] = bgSizeArray as string[];
    let styleDataList;
    if (styleData) {
      let unifiedValue = /^-?[1-9]\d*$/.test(value) ? value + unit : value; //正则匹配非0数字并加单位
      if (
        unifiedValue === null ||
        unifiedValue === undefined ||
        unifiedValue.replace(/\s*/g, '') === '' //空格和空字符串也为空值
      )
        unifiedValue = 'auto';
      if (direction === 'horizontal') {
        styleDataList = [
          {
            styleKey,
            value:
              unifiedValue !== 'auto' || height !== 'auto' ? unifiedValue + ' ' + height : null,
          },
        ];
      } else {
        styleDataList = [
          {
            styleKey,
            value: unifiedValue !== 'auto' || width !== 'auto' ? width + ' ' + unifiedValue : null,
          },
        ];
      }
      onStyleChange(styleDataList);
    }
  };

  const initData = () => {
    if (styleData.backgroundColor) {
      setBgType('color');
    } else if (styleData.backgroundImage) {
      setBgType('bgImg');
    } else {
      setBgType(null);
    }
    setBgRepeatType(styleData.backgroundRepeat);
    const bgSizeType =
      styleData.backgroundSize === backgroundSizeMap.contain ||
      styleData.backgroundSize === backgroundSizeMap.cover
        ? styleData.backgroundSize
        : backgroundSizeMap.default;
    setBgSizeType(bgSizeType);
    const chosenItem = backgroundPosition.dataList.find((item) => {
      return item.position === styleData.backgroundPosition;
    });
    setBgPositionType(chosenItem?.title);
  };

  useEffect(() => {
    initData();
  }, [styleData]);

  const formatBgImgUrl = (url: string) => {
    if (url && url != '') {
      return 'url(' + url + ')';
    } else {
      return null;
    }
  };

  const backToBgImgUrl = (styleUrl: string) => {
    if (styleUrl) {
      // const reg = /^url\(.*\)/;
      // var result = styleUrl.match(reg);
      let newUrl = styleUrl.substring(styleUrl.indexOf('(') + 1, styleUrl.indexOf(')'));

      return newUrl;
      // return styleUrl.substring(
      //   styleUrl.indexOf("(") + 1,
      //   styleUrl.indexOf(")") - 1
      // );
    } else {
      return '';
    }
  };

  return (
    <div className="flyfox-font-style-container">
      <Row
        title={backgroundType.title}
        dataList={backgroundType.dataList}
        styleKey=""
        {...props}
        onStyleChange={onBgTypeChange}
        value={bgType}
      />

      {bgType == 'color' && (
        <Row title={' '} styleKey="" {...props}>
          <ColorInput styleKey={'backgroundColor'} {...props} inputWidth="100%" />
        </Row>
      )}
      {bgType == 'bgImg' && (
        <Row title={''} styleKey="" {...props}>
          <Input
            addonBefore={<PictureOutlined />}
            placeholder="输入图片url"
            size="small"
            style={{ width: '100%' }}
            value={backToBgImgUrl(styleData['backgroundImage'])}
            onChange={(e) => onBgImageChange(e.target.value)}
          />
        </Row>
      )}
      {bgType == 'bgImg' && (
        <Fragment>
          <Row
            title={backgroundSize.title}
            dataList={backgroundSize.dataList}
            styleKey="backgroundSize"
            {...props}
            onStyleChange={onBgSizeTypeChange}
            value={bgSizeType}
          />
          {bgSizeType == backgroundSizeMap.default && (
            <div className="inner-row-container-bgsize">
              <div className="row-item">
                <span className="row-item-title">宽</span>
                <Number
                  style={{ marginRight: '4px' }}
                  min={0}
                  styleKey="backgroundSize"
                  {...props}
                  onChangeFunction={(styleKey: string, val: number, unit: string) =>
                    onBgSizeChange(styleKey, val, unit, styleData, 'width')
                  }
                  multiProp={0}
                />
              </div>
              <div className="row-item">
                <span className="row-item-title">高</span>
                <Number
                  styleKey="backgroundSize"
                  min={0}
                  {...props}
                  onChangeFunction={(styleKey: string, val: number, unit: string) =>
                    onBgSizeChange(styleKey, val, unit, styleData, 'height')
                  }
                  multiProp={1}
                />
              </div>
            </div>
          )}
          <Row title={backgroundPosition.title} styleKey="border" {...props}>
            <div className="background-position-container">
              <div className="background-position-container-left">
                {backgroundPosition.dataList.map((item) => {
                  return (
                    <div
                      className={bgPositionType === item.title ? 'sel-icon' : ''}
                      onClick={() => {
                        setBgPositionType(item.title);
                        onStyleChange([
                          {
                            styleKey: 'backgroundPosition',
                            value: item.position,
                          },
                        ]);
                      }}
                    >
                      <Icon className="background-position-icon" type={item.icon} />
                    </div>
                  );
                })}
              </div>
              <Space direction="vertical">
                <InputNumber
                  addonBefore="距左侧"
                  placeholder="自动"
                  addonAfter="px"
                  size="small"
                  onChange={(value) => {
                    onBgPositionChange(value, 'horizontal');
                  }}
                  value={parseValue(styleData['backgroundPosition'], 0) as string}
                />
                <InputNumber
                  addonBefore="距上方"
                  size="small"
                  addonAfter="px"
                  placeholder="自动"
                  onChange={(value) => {
                    onBgPositionChange(value, 'verticle');
                  }}
                  value={parseValue(styleData['backgroundPosition'], 1) as string}
                />
              </Space>
            </div>
          </Row>
          <Row
            title={backgroundRepeat.title}
            dataList={backgroundRepeat.dataList}
            styleKey=""
            {...props}
            onStyleChange={onBgRepeatChange}
            value={bgRepeatType}
          />
        </Fragment>
      )}
    </div>
  );
};
