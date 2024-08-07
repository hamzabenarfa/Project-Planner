import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProjectLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string }; 
}>) {
  return (
    <section className="min-h-screen  flex">
      <aside className="w-64 px-6 py-8 space-y-8 ">
        <h2 className="font-bold mb-2">OVERVIEW</h2>
        <ul className="space-y-2 ">
          <Button variant="secondary" asChild className=" w-full">
            <Link href={`/`}>Dashboard</Link>
          </Button>
          <Button variant="secondary" asChild className=" w-full">
            <Link href={`${params.id}/kanban`}>Kanban</Link>
          </Button>
          <li>UML</li>
          <li>Figma</li>
        </ul>
      </aside>

      <div className="w-px bg-gray-300"></div>

      <main className=" w-full">{children}</main>
    </section>
  );
}
