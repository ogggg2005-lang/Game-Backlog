import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-4 py-4 mb-6 border-b">
      <Link href="/" className="hover:underline">
        หน้าแรก
      </Link>
      <Link href="/courses" className="hover:underline">
        รายวิชา
      </Link>
      <Link href="/about" className="hover:underline">
        เกี่ยวกับเรา
      </Link>
      <Link href="/bands" className="hover:underline">
        Favorite Bands
      </Link>
    </nav>
  );
}