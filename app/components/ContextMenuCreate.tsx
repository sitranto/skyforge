import React, { forwardRef } from 'react';
import { FolderPlus, FilePlus } from "lucide-react";

interface ContextMenuProps {
    menuPosition: { x: number; y: number };
    setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
    currentFolder: string;
}

const ContextMenuCreate = forwardRef<HTMLUListElement, ContextMenuProps>(({ menuPosition, setMenuVisible, currentFolder }, ref) => {
    return (
        <ul
            ref={ref}
            className="absolute bg-black border-2 border-indigo-600 rounded-lg w-50 z-10"
            style={{
                top: `${menuPosition.y - 40}px`,
                left: `${menuPosition.x}px`
            }}
        >
            <li
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-400 cursor-pointer"
                onClick={() => {
                    alert("Создать папку");
                    setMenuVisible(false);
                }}
            >
                <FolderPlus size={18} /> Создать папку
            </li>
            <li
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-400 cursor-pointer"
                onClick={() => {
                    alert("Загрузить файл");
                    setMenuVisible(false);
                }}
            >
                <FilePlus size={18} /> Загрузить файл
            </li>
        </ul>
    );
});

export default ContextMenuCreate;
