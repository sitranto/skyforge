"use client";

import {useState} from "react";
import {Folder, FileText, List, Grid, ArrowLeft, ChevronDown, ChevronRight} from "lucide-react";
import http from "@/app/actions/http";

export default function Dashboard() {
    const [viewMode, setViewMode] = useState("grid");
    const [currentPath, setCurrentPath] = useState("/");
    const [expandedFolders, setExpandedFolders] = useState({});

    const toggleFolder = (path) => setExpandedFolders((prev) => ({...prev, [path]: !prev[path]}));

    return (
        <div className="flex w-full">
            <div className="flex-1 flex items-center justify-center p-6">
                <Sidebar currentPath={currentPath} setCurrentPath={setCurrentPath} expandedFolders={expandedFolders}
                         toggleFolder={toggleFolder}/>
                <FileViewer currentPath={currentPath} viewMode={viewMode} setViewMode={setViewMode}
                            setCurrentPath={setCurrentPath}/>
            </div>
        </div>
    );
}

const fileStructure = await http.getCloudData("test1")


function Sidebar({currentPath, setCurrentPath, expandedFolders, toggleFolder}) {
    const parentPath = currentPath === "/" ? "/" : currentPath.substring(0, currentPath.lastIndexOf("/")) || "/";

    return (
        <aside className="w-80 h-3/5 overflow-hidden rounded-l-2xl border-4 border-indigo-600 border-r-0 flex flex-col p-2">
            <div className="p-6 sticky top-0 z-10">
                <h2 className="text-lg font-semibold">Мои файлы и папки</h2>
                <button
                    onClick={() => currentPath !== "/" && setCurrentPath(parentPath)}
                    disabled={currentPath === "/"}
                    className={`flex items-center gap-2 p-2 mb-2 rounded-lg
                        ${currentPath === "/" ? "cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600"}
                    `}
                >
                    <ArrowLeft size={20}/> Назад
                </button>
            </div>
            <div className="flex-1 p-2 overflow-y-auto [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                <ul className="flex flex-col gap-2">
                    {fileStructure["/"].map((file) => (
                        <FileItem key={file.path} file={file} setCurrentPath={setCurrentPath}
                                  expandedFolders={expandedFolders} toggleFolder={toggleFolder}/>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

function FileItem({ file, setCurrentPath, expandedFolders, toggleFolder }) {
    return (
        <div>
            <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer">
                {/* Иконка папки или файла */}
                {file.type === "folder" ? (
                    <Folder size={20} className="text-yellow-500" />
                ) : (
                    <FileText size={20} className="text-blue-500" />
                )}

                {/* Название файла/папки (переход внутрь только при клике) */}
                <span
                    className="flex-1"
                    onClick={() => file.type === "folder" && setCurrentPath(file.path)}
                >
                    {file.name}
                </span>

                {/* Кнопка раскрытия папки (стрелочка) */}
                {file.type === "folder" && fileStructure[file.path] && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Останавливаем всплытие клика
                            toggleFolder(file.path);
                        }}
                        className="p-1 rounded-lg hover:bg-gray-600"
                    >
                        {expandedFolders[file.path] ? (
                            <ChevronDown size={16} />
                        ) : (
                            <ChevronRight size={16} />
                        )}
                    </button>
                )}
            </li>

            {/* Вложенные файлы и папки */}
            {expandedFolders[file.path] && fileStructure[file.path] && (
                <ul className="ml-6 border-l border-gray-600 pl-2">
                    {fileStructure[file.path].map((subfile) => (
                        <FileItem
                            key={subfile.path}
                            file={subfile}
                            setCurrentPath={setCurrentPath}
                            expandedFolders={expandedFolders}
                            toggleFolder={toggleFolder}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

function FileViewer({currentPath, viewMode, setViewMode, setCurrentPath}) {
    const files = fileStructure[currentPath] || [];
    return (
        <div className="w-3/5 h-3/5 rounded-r-2xl shadow-xl p-6 border-4 border-indigo-600">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">{currentPath}</h2>
                <div className="flex gap-3">
                    <button onClick={() => setViewMode("grid")}
                            className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-gray-400" : "bg-gray-700"}`}>
                        <Grid size={24}/>
                    </button>
                    <button onClick={() => setViewMode("list")}
                            className={`p-2 rounded-full ${viewMode === "list" ? "bg-gray-400" : "bg-gray-700"}`}>
                        <List size={24}/>
                    </button>
                </div>
            </div>
            <div className="overflow-y-auto [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 h-4/5">
                {viewMode === "grid" ? (
                    <div className="grid grid-cols-5 gap-6">
                        {files.map((file) => <FileThumbnail key={file.path} file={file} setCurrentPath={setCurrentPath}/>)}
                    </div>
                ) : (
                    <ul className="space-y-2">
                        {files.map((file) => <FileListItem key={file.path} file={file} setCurrentPath={setCurrentPath}/>)}
                    </ul>
                )}
            </div>
        </div>
    );
}

function FileThumbnail({file, setCurrentPath}) {
    return (
        <div className="flex flex-col items-center p-4 w-40 h-30 rounded-lg hover:bg-gray-600 cursor-pointer"
             onClick={() => file.type === "folder" && setCurrentPath(file.path)}>
            {file.type === "folder" ? <Folder size={64} className="text-yellow-500 mb-3"/> :
                <FileText size={64} className="text-blue-500 mb-3"/>}
            <p className="text-md font-medium text-center">{file.name}</p>
        </div>
    );
}

function FileListItem({file, setCurrentPath}) {
    return (
        <li className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-600 cursor-pointer"
            onClick={() => file.type === "folder" && setCurrentPath(file.path)}>
            {file.type === "folder" ? <Folder size={30} className="text-yellow-500"/> :
                <FileText size={30} className="text-blue-500"/>}
            <div>
                <p className="text-lg font-medium">{file.name}</p>
            </div>
        </li>
    );
}