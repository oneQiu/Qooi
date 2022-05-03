---
title: RichEditor 富文本编辑器
group:
  title: 工具类
---

# RichEditor 富文本编辑器

> 基于[tinymce](https://www.tiny.cloud)封装的富文本编辑器，适用于模板生成、替换等场景

## 代码演示

```tsx
import { RichEditor } from 'qooi';
import React from 'react';

export default () => {
  return (
    <div style={{ minHeight: 500 }}>
      <RichEditor mode="normal" />
    </div>
  );
};
```

<API></API>
