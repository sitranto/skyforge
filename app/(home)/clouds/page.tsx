import http from "@/app/actions/http"

export default function CloudPage() {
    return (
        <div className="w-10/12 h-10/12 m-0 m-auto flex stretch p-5 pr-2 border-3 border-indigo-600 rounded-xl">
            <div className="flex w-full pr-3 overflow-y-auto [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300
            dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                {CloudList(testObject)}
            </div>
        </div>
    )
}

const testObject = await http.getAllClouds()

const CloudList = (data) => {
    const listItems = data.map(item =>
        <li
            key={item.name}
            className="mt-2 mb-5 w-full">
            {item.name}
            <div className="border-2 border-b border-indigo-600 w-full" />
        </li>
    )

    return (
        <ul className="w-full">{listItems}</ul>
    )
}