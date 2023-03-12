---
title: StyleSetter CSS可视化编辑器
group:
  title: 工具类
---

# StyleSetter CSS 可视化编辑器

> 将 CSS 属性可视化配置

## 代码演示

```tsx
import { StyleSetter } from 'qooi';
import React, { useState } from 'react';
import { Button, Space, Tag } from 'antd';

const { CheckableTag } = Tag;
const modules = ['background', 'border', 'font', 'layout', 'position'];
const moduleName = {
  background: '背景',
  border: '边框',
  font: '字体',
  layout: '布局',
  position: '定位',
};

export default () => {
  const [style, setStyle] = useState({
    width: 300,
    height: 300,
    border: '1px solid red',
  });
  const [moduleList, setModuleList] = useState<string[]>(modules);

  const onStyleChange = (value) => {
    setStyle(value);
  };

  const onModuleChange = (k, v) => {
    setModuleList(v ? [...moduleList, k] : moduleList.filter((m) => m !== k));
  };

  return (
    <div>
      <Space>
        <span>模块：</span>
        {modules.map((key) => (
          <CheckableTag
            key={key}
            checked={moduleList.includes(key)}
            onChange={(v) => onModuleChange(key, v)}
          >
            {moduleName[key]}
          </CheckableTag>
        ))}
      </Space>
      <div style={{ display: 'flex', marginTop: 5 }}>
        <div style={{ flex: 1 }}>
          <div style={style}>Demo-受控</div>
        </div>
        <StyleSetter value={style} onChange={onStyleChange} showModuleList={moduleList} />
      </div>
    </div>
  );
};
```

<API></API>
