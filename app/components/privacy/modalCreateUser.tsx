import React, {useState} from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalCreateFolder: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
            <div className="bg-black border-indigo-600 border-2 p-5 rounded-lg shadow-lg w-1/5">
                <h2 className="text-lg font-bold">Создать пользователя</h2>
                <input
                    type="text"
                    className="border rounded-lg p-2 w-full mt-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Имя пользователя" />
                <input
                    type="text"
                    className="border rounded-lg p-2 w-full mt-2"
                    placeholder="Пароль" />
                <div className="flex justify-end gap-2 mt-4">
                    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>
                        Закрыть
                    </button>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded"
                            onClick={() => {
                                console.log(`Создание пользователя "${name}"`);
                                onClose();
                            }}>
                        Создать
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalCreateFolder;
