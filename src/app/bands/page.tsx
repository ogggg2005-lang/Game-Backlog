import { Roboto } from "next/font/google";
import BandExplorer from "../../components/BandExplorer";
import { favoriteBands } from "../../data/bands";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function BandsPage() {
  return (
    <main className={`${roboto.className} mx-auto min-h-screen max-w-6xl p-8`}>
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-black dark:text-white sm:text-4xl">
          Favorite Bands
        </h1>
        <p className="mt-2 text-base font-medium text-gray-600 dark:text-gray-400">
          วงดนตรีและศิลปินที่ชื่นชอบ
        </p>
      </header>

      <BandExplorer bands={favoriteBands} />
    </main>
  );
}