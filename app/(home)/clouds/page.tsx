"use client";

import http from "@/app/actions/http"
import Link from "next/link";
import { SquarePlus } from "lucide-react";
import { useEffect, useState } from "react";
import ModalCreateClouds from "@/app/components/clouds/modalCreateClouds";

export default function CloudPage() {
    const [open, setOpen] = useState(false);
    const [clouds, setClouds] = useState([]);
    const [selectedClouds, setSelectedClouds] = useState<string[]>([]); // Используем массив строк

    const handleOpenAdd = () => {
        setOpen(true);
    };

    const handleToggleSelect = (name: string) => {
        setSelectedClouds(prev => {
            if (prev.includes(name)) {
                return prev.filter(cloud => cloud !== name);
            } else {
                return [...prev, name];
            }
        });
    };

    const handleClearSelected = () => {
        setSelectedClouds([]); // Очистка выбранных облаков
    };

    const handleDeleteSelected = async () => {
        if (selectedClouds.length > 0) {
            try {
                fetchCloudStructure();
                setSelectedClouds([]);
            } catch (error) {
                console.error("Нет выделенных облаков:", error);
            }
        }
    };

    useEffect(() => {
        fetchCloudStructure();
    }, []);

    const fetchCloudStructure = async () => {
        const data = await http.getAllClouds();
        setClouds(data);
    };

    return (
        <div className="w-8/12 h-10/12 m-0 m-auto flex stretch p-5 pr-2 border-3 border-indigo-600 rounded-xl">
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <span className="font-bold gap-4 text-lg">
                            {selectedClouds.length > 0 ? `${selectedClouds.length} выбрано` : "Нет выбранных"}
                        </span>
                    </div>
                    <div>
                        <button
                            onClick={handleClearSelected}
                            className={`px-4 py-2 ${selectedClouds.length != 0 && "bg-gray-600"} text-white rounded-md hover:bg-gray-400`}
                        >
                            Очистить выбранное
                        </button>
                        <button
                            onClick={handleDeleteSelected}
                            className="bg-red-600 text-white p-2 rounded-md hover:bg-red-500"
                        >
                            Удалить
                        </button>
                    </div>
                </div>

                <div className="flex w-full pr-3 overflow-y-auto [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                    {CloudList(clouds, handleOpenAdd, handleToggleSelect, selectedClouds)}
                </div>
            </div>

            <ModalCreateClouds
                isOpen={open}
                onClose={() => setOpen(false)}
                refreshClouds={fetchCloudStructure}
            />
        </div>
    );
}

const CloudList = (
    data: any,
    handleOpenAdd: () => void,
    handleToggleSelect: (name: string) => void,
    selectedClouds: string[] // Массив строк для выбранных облаков
) => {
    const listItems = data.map(item =>
        <li key={item.name} className="mt-2 mb-5 w-full p-2 rounded-lg transition-all duration-200 hover:bg-gray-500 hover:text-white hover:scale-102">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={selectedClouds.includes(item.name)} // Проверяем, выбран ли сервер
                    onChange={() => handleToggleSelect(item.name)}
                    className="mr-2"
                />
                <Link href={`/clouds/${item.name}`} passHref>
                    <span className="cursor-pointer">{item.name}</span>
                </Link>
            </div>
            <div className="border-2 border-b border-indigo-600 w-full" />
        </li>
    );

    return (
        <ul className="w-11/12 mx-auto">
            {listItems}
            <li onClick={handleOpenAdd} className="mt-2 mb-5 w-full p-2 rounded-lg transition-all duration-200 hover:bg-gray-500 hover:text-white hover:scale-102">
                <SquarePlus size={16} className="mb-1" />
                <div className="border-2 border-b border-indigo-600 w-full" />
            </li>
        </ul>
    );
};