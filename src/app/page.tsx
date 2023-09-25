import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white p-10">
      <Link href="/ingredient">Ingredient List</Link>
      <Link href="/menu">Menu List</Link>
    </main>
  );
}
