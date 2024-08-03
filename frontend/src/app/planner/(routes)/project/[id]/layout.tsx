export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen  flex">
      <aside className="w-64 px-6 py-8 space-y-8 ">
        <h2 className="font-bold mb-2">OVERVIEW</h2>
        <ul className="space-y-2 ">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
        </ul>
      </aside>

      <div className="w-px bg-gray-300"></div>

      <main className="">{children}</main>
    </section>
  );
}
