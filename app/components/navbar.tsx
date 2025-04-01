import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="relative flex items-center justify-center text-white py-4">
            <div className="absolute left-4 flex items-center">
                <img src="/logo.png" alt="Icon" className="w-40 h-40"/>
            </div>
            <div className="flex space-x-6">
                <Link href="/clouds" className="hover:text-gray-400 transition">Clouds</Link>
                <Link href="/privacy" className="hover:text-gray-400 transition">Privacy</Link>
                <Link href="/" className="hover:text-red-400 transition">Log out</Link>
            </div>
        </nav>
    );
}
