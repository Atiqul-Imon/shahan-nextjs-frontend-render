"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/project", label: "Projects" },
    { href: "/contact", label: "Contact" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">Shahan</Link>
        </div>
        <nav className="hidden md:flex space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "text-yellow-400" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <FaUserCircle size={24} />
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 