import Navbar from "@/app/components/navbar";
import "./page.css"

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div>
            <Navbar/>
            <div className="flex items-center">
                <div className="border-1 border-indigo-600 border-solid w-full"/>
            </div>
            <div className="pageContainer">
                {children}
            </div>
        </div>
    )
}