import Sidebar from "./sidebar";

export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen flex">
      <Sidebar />
      <main className=" w-full">{children}</main>
    </section>
  );
}
