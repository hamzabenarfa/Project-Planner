import Navbar from "./_components/navbar";

export default function PlannerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <Navbar />
      
        <main className="pt-16"> {/* Add padding-top equivalent to the navbar height */}
        {children}
      </main>
    </main>
  );
}
