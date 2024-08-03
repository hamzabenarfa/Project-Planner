export default function Page({ params }: { params: { id: number } }) {
  console.log("🚀 ~ Page ~ params:", typeof params.id);

  return (
    <div className="">
    
      {/* Main Content */}
      <section className="flex-grow space-y-4 p-4">{params.id}</section>

      {/* Sidebar */}
    </div>
  );
}
