import * as React from 'react';
import Layout from './pro/layout';
import Position from './pro/position';
import Font from './pro/font';
import Border from './pro/border';
import Background from './pro/background';
import CssCode from './components/css-code';
import { StyleData } from './utils/types';
import { Button, Popover, Collapse } from 'antd';
import { EditOutlined } from '@ant-design/icons';

interface StyleSetterProps {
  value?: StyleData;
  defaultValue?: string;
  onChange: (val: any) => void;
  /** 是否显示源码 */
  isShowCssCode: boolean;
  /** 模块控制 */
  showModuleList: string[];
  width?: number | string;
  /** 默认展开 */
  defaultExpandModules?: string[];
}

export default class StyleSetter extends React.PureComponent<StyleSetterProps> {
  static defaultProps = {
    width: 300,
    // 默认单位
    unit: 'px',
    // 默认计算尺寸缩放
    placeholderScale: 1,
    // 展示板块
    showModuleList: ['background', 'border', 'font', 'layout', 'position'],
    defaultExpandModules: ['background', 'border', 'font', 'layout', 'position'],
    // 是否展示css源码编辑面板
    isShowCssCode: true,
    // layout 配置面板
    layoutPropsConfig: {
      // display 展示列表
      showDisPlayList: ['inline', 'flex', 'block', 'inline-block', 'none'],
      isShowPadding: true,
      isShowMargin: true,
      isShowWidthHeight: true,
    },

    fontPropsConfig: {
      // fontFamily列表
      fontFamilyList: [
        { value: 'Helvetica', label: 'Helvetica' },
        { value: 'Arial', label: 'Arial' },
        { value: 'serif', label: 'serif' },
      ],
    },

    // position 配置面板
    positionPropsConfig: {
      isShowFloat: true,
      isShowClear: true,
    },
  };

  state = { styleData: {}, cssCodeVisiable: false, initFlag: false };

  componentDidMount() {
    const { value } = this.props;
    if (value) {
      this.setState({
        styleData: value,
      });
    }

    this.setState({
      initFlag: true,
    });
  }

  changeCssCodeVisiable = (visible: boolean) => {
    this.setState({
      cssCodeVisiable: !visible,
    });
  };

  /**
   * style更改
   * @param styleKey
   * @param value
   */
  onStyleChange = (styleDataList: Array<StyleData>) => {
    const { onChange } = this.props;
    let styleData: StyleData | any = Object.assign({}, this.state.styleData);
    styleDataList &&
      styleDataList.map((item) => {
        if (item.value == undefined || item.value == null) {
          delete styleData[item.styleKey];
        } else {
          styleData[item.styleKey] = item.value;
        }
      });

    this.setState({
      styleData,
    });

    onChange?.(styleData);
    console.log(styleData);
  };

  onStyleDataChange = (styleData: StyleData) => {
    this.setState({
      styleData,
    });
    const { onChange } = this.props;

    onChange && onChange(styleData);
  };

  render() {
    const { isShowCssCode, showModuleList, width, defaultExpandModules } = this.props;
    const { styleData } = this.state;
    console.log('styleData', styleData);

    return (
      <div className="flyfox-style-setter" style={{ width }}>
        {isShowCssCode && (
          <Popover
            title="CSS源码编辑"
            trigger={'click'}
            content={
              <div style={{ width: 500 }}>
                <CssCode styleData={styleData} onStyleDataChange={this.onStyleDataChange} />
              </div>
            }
          >
            <Button type="primary" icon={<EditOutlined />} style={{ marginBottom: 5 }}>
              源码
            </Button>
          </Popover>
        )}
        <Collapse defaultActiveKey={defaultExpandModules}>
          {showModuleList.filter((item) => item == 'layout').length > 0 && (
            <Collapse.Panel key="layout" header="布局">
              <Layout onStyleChange={this.onStyleChange} styleData={styleData} {...this.props} />
            </Collapse.Panel>
          )}

          {showModuleList.filter((item) => item == 'position').length > 0 && (
            <Collapse.Panel key="position" header="定位">
              <Position onStyleChange={this.onStyleChange} styleData={styleData} {...this.props} />
            </Collapse.Panel>
          )}

          {showModuleList.filter((item) => item == 'font').length > 0 && (
            <Collapse.Panel key="font" header="文字">
              <Font onStyleChange={this.onStyleChange} styleData={styleData} {...this.props} />
            </Collapse.Panel>
          )}

          {showModuleList.filter((item) => item == 'background').length > 0 && (
            <Collapse.Panel key="background" header="背景">
              <Background
                onStyleChange={this.onStyleChange}
                styleData={styleData}
                {...this.props}
              ></Background>
            </Collapse.Panel>
          )}

          {showModuleList.filter((item) => item == 'border').length > 0 && (
            <Collapse.Panel key="border" header="边框">
              <Border onStyleChange={this.onStyleChange} styleData={styleData} {...this.props} />
            </Collapse.Panel>
          )}
        </Collapse>
      </div>
    );
  }
}
