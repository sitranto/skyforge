import React, { forwardRef } from 'react';
import { ArrowDownToLine, Trash } from "lucide-react";

interface ContextMenuProps {
    menuPosition: { x: number; y: number };
    setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
    filePath: string;
    fileName: string;
}

const ContextMenuFile = forwardRef<HTMLUListElement, ContextMenuProps>(({ menuPosition, setMenuVisible, filePath, fileName }, ref) => {
    return (
        <ul
            ref={ref}
            className="absolute bg-black border-2 border-indigo-600 rounded-lg w-50 z-10"
            style={{
                top: `${menuPosition.y}px`,
                left: `${menuPosition.x}px`
            }}
        >
            <li
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-400 cursor-pointer"
                onClick={() => {
                    alert(`Скачать файл: ${fileName}`);
                    setMenuVisible(false);
                }}
            >
                <ArrowDownToLine size={18} /> Скачать
            </li>
            <li
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-400 cursor-pointer"
                onClick={() => {
                    alert(`Удалить файл: ${fileName}`);
                    setMenuVisible(false);
                }}
            >
                <Trash  size={18} /> Удалить
            </li>
        </ul>
    );
});

export default ContextMenuFile;
