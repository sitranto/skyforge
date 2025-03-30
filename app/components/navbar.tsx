import "./navbar.css";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link href="/clouds">Clouds</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/">Log out</Link>
        </nav>
    )
}