import React, {useState} from "react";
import http from "@/app/actions/http";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    path: string;
    refreshData: () => void
}

const ModalUploadFile: React.FC<ModalProps> = ({isOpen, onClose, path, refreshData}) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState("не завершена");

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const getCloudName = () => {
        const url = window.location.href.split("/")
        return url[url.length - 1]
    }

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        await http.uploadFile(getCloudName(), file)
            .finally(() => {
                refreshData()
                setProgress("Завершена")
            })
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
            <div className="bg-black border-indigo-600 border-2 p-5 rounded-lg shadow-lg w-1/3">
                <h2 className="text-lg font-bold">Загрузка файла</h2>
                <h3 className="text-md">Текущий путь загрузки: {path}</h3>

                <div className="mt-4">
                    <input
                        type="file"
                        className="border p-2 w-full"
                        onChange={handleFileChange}
                    />
                </div>

                {uploading ? (

                    <div className="flex gap-2 mt-4">
                        <div className="mt-4">
                            <p>Загрузка: {progress}</p>
                        </div>
                        <div className="mt-2 pl-77">
                            {progress == "Завершена" ? (
                                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>
                                    Закрыть
                                </button>
                            ) : (<></>)}
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-end gap-2 mt-4">
                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>
                            Закрыть
                        </button>
                        <button
                            className="bg-indigo-600 text-white px-4 py-2 rounded"
                            onClick={handleUpload}
                            disabled={!file}
                        >
                            Загрузить
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalUploadFile;
