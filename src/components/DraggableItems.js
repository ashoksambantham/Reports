import { useDrag } from 'react-dnd';

export default function DraggableItems(item) {
    
    const [{ isDragging }, drag] = useDrag(() => ({
        type: item.type,
        item: { type: item.type, content: item.content },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`toc-item ${isDragging ? 'dragging' : ''}`}
        >
            {item.label}
        </div>
    );
}