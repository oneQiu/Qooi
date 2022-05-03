---
title: TabDrawer 标签式抽屉
group:
  title: 展示类
---

# TabDrawer 标签式抽屉

> 撮合`Tabs`和`Drawer`组件一体，用于展示多抽屉合一场景。

## 代码演示

```tsx
import { TabDrawer } from 'qooi';
import React from 'react';
import { Button } from 'antd';

export default () => {
  return (
    <div>
      <Button>展开</Button>
      <TabDrawer tabs={[]} />
    </div>
  );
};
```

<API></API>
