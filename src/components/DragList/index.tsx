import React from 'react';
import { createPortal } from 'react-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useDraggable,
  useDroppable,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableTreeItem from './widgets/SortableTreeItem';

export default () => {
  const items = [1, 2, 3, 4, 5];

  return (
    <div
      style={{
        maxWidth: 600,
        padding: 10,
        margin: '0 auto',
        marginTop: '10%',
      }}
    >
      <DndContext>
        <SortableContext items={items}>
          {items.map((i, idx) => (
            <SortableTreeItem items={[]} key={idx}>
              <div>{`${i}-${idx}`}</div>
            </SortableTreeItem>
          ))}
          {/* 悬浮层 */}
          {createPortal(<DragOverlay />, document.body)}
        </SortableContext>
      </DndContext>
    </div>
  );
};
