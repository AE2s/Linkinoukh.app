import Link from 'next/link';

const Navbar = () => (
    <nav className="navbar">
        <Link href="/">
            <a className="navbar-brand">Linkinoukh</a>
        </Link>
        <Link href="/new">
            <a className="create">Create profile</a>
        </Link>
    </nav>
)

export default Navbar;