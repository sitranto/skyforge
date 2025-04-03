"use client";

import http from "@/app/actions/http";
import Link from "next/link";
import { useState } from "react";

export default function CloudPage() {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const handleSelectUser = (userName: string) => {
        setSelectedUsers((prev) =>
            prev.includes(userName) ? prev.filter((name) => name !== userName) : [...prev, userName]
        );
    };

    const handleDeselectAll = () => {
        setSelectedUsers([]);
    };

    const handleDeleteUsers = () => {
        console.log("Удалены пользователи:", selectedUsers);
        setSelectedUsers([]);
    };

    return (
        <div className="w-8/12 h-10/12 m-0 m-auto flex stretch border-2 border-indigo-600 rounded-xl">
            <div className="w-full">
                {/* Меню управления */}
                <div className="flex justify-between items-center p-3 border-b-2 border-indigo-600 mb-3">
                    <span className="text-lg font-semibold">
                        {selectedUsers.length} выбрано
                    </span>
                    <div className="flex gap-4">
                        <button
                            onClick={handleDeselectAll}
                            className={`px-4 py-2 ${selectedUsers.length != 0 && "bg-gray-600"} text-white rounded-md hover:bg-gray-400`}
                        >
                            Отменить выделение
                        </button>
                        <button
                            onClick={handleDeleteUsers}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Удалить
                        </button>
                    </div>
                </div>
                {/* Меню выбора пользователей */}
                <div className="flex w-full pr-3 overflow-y-auto [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300
                    dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                    {CloudList(testObject, selectedUsers, handleSelectUser)}
                </div>
            </div>
        </div>
    );
}

const testObject = [
    { name: "Arsehha" },
    { name: "Sitranto" },
];

const CloudList = (
    data: { name: string }[],
    selectedUsers: string[],
    handleSelectUser: (userName: string) => void
) => {
    const listItems = data.map((item) => (
        <li
            key={item.name}
            onClick={() => handleSelectUser(item.name)}
            className={`mt-2 mb-5 w-full p-2 rounded-lg transition-all duration-200 cursor-pointer ${
                selectedUsers.includes(item.name)
                    ? "bg-gray-500 text-white"
                    : "hover:bg-gray-500 hover:text-white"
            }`}
        >
            <div className="flex justify-between items-center">
                <span>{item.name}</span>
                {selectedUsers.includes(item.name) && (
                    <span className="text-sm text-green-400">Выбрано</span>
                )}
            </div>
            <div className="border-2 border-b border-indigo-600 w-full" />
        </li>
    ));

    return <ul className="w-11/12 mx-auto">{listItems}</ul>;
};
