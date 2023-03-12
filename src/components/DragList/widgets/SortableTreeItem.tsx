import { AnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from 'antd';
import React, { CSSProperties } from 'react';
import DragHandle from './DragHandle';

interface IProps {
  id: string;
}

const animateLayoutChanges: AnimateLayoutChanges = ({ isSorting, wasDragging }) =>
  isSorting || wasDragging ? false : true;
export default ({ id }: IProps) => {
  const {
    attributes,
    isDragging,
    isSorting,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition,
  } = useSortable({ id, animateLayoutChanges });
  const dragHandleProps = { ...attributes, ...listeners };
  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setDraggableNodeRef} style={style}>
      <div ref={setDroppableNodeRef}>
        <DragHandle {...dragHandleProps} />
      </div>
    </div>
  );
};
