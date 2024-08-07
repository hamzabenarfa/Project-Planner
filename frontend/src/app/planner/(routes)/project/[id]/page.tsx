export default function Page({ params }: { params: { id: number } }) {
  console.log("🚀 ~ Page ~ params:", typeof params.id);

  return (
    <div className="container p-4">
      <section className="flex-grow space-y-4 p-4">Dashboard</section>
    </div>
  );
}
