import React, {useState} from "react";
import http from "@/app/actions/http";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    refreshClouds: () => void;
}

const ModalCreateClouds: React.FC<ModalProps> = ({ isOpen, onClose, refreshClouds }) => {
    const [name, setName] = useState("");
    const [path, setPath] = useState("");

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
            <div className="bg-black border-indigo-600 border-2 p-5 rounded-lg shadow-lg w-1/5">
                <h2 className="text-lg font-bold">Создать облако</h2>
                <input
                    type="text"
                    className="border rounded-lg p-2 w-full mt-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Название облака" />
                <input
                    type="text"
                    className="border rounded-lg p-2 w-full mt-2"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    placeholder="Путь" />
                <div className="flex justify-end gap-2 mt-4">
                    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>
                        Закрыть
                    </button>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded"
                            onClick={async () => {
                                await http.createCloud(name, path).catch((err: Error) => {console.log(err)})
                                refreshClouds()
                                onClose();
                            }}>
                        Создать
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalCreateClouds
