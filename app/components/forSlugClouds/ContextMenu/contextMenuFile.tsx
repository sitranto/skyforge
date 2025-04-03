import React, { forwardRef } from 'react';
import { ArrowDownToLine, Trash } from "lucide-react";
import http from "@/app/actions/http";

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
                    getFile({filePath, fileName})
                    setMenuVisible(false);
                }}
            >
                <ArrowDownToLine size={18} /> Скачать
            </li>
            <li
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-400 cursor-pointer"
                onClick={() => {
                    getCloudName()
                    http.deleteFile(getCloudName(), fileName)
                    setMenuVisible(false);
                }}
            >
                <Trash  size={18} /> Удалить
            </li>
        </ul>
    );
});

const getFile = ({filePath, fileName}) => {
    fetch(`http://127.0.0.1:8080${filePath}`,)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = fileName
            a.click()
        })
}

const getCloudName = () => {
    const url = window.location.href.split("/")
    return url[url.length - 1]
}

export default ContextMenuFile;
