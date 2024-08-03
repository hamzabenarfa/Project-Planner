export default function Page({ params }: { params: { id: number } }) {
    console.log("🚀 ~ Page ~ params:", typeof params.id)

    
    return <div>My Post: {params.id}</div>
  }