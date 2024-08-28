import { MessageSquare, Paperclip } from "lucide-react";

const TaskFooter = () => {
  const data = [
    {
      src: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      alt: "Image Description",
    },
    {
      src: "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      alt: "Image Description",
    },
    
    {
      src: "/exemple/other-random-dude.jpg",
      alt: "Image Description",
    },
    {
      src: "/exemple/random-stock-photo.jpg",
      alt: "Image Description",
    },
  ];
  return (
    <footer className="flex items-center flex-row justify-between w-full">
      <div className="flex -space-x-4">
        {data.map((item, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            className="inline-block object-cover size-8 rounded-full ring-2 ring-blue-50 dark:ring-gray-800"
            src={item.src}
            alt={item.alt}
          />
        ))}
      </div>
      <div className="flex flex-row gap-1">

  
      <div
        className=" flex flex-row items-center justify-center gap-1
      text-white border-[1px] backdrop-blur-3xl bg-white/30 py-[2px] px-3 rounded-xl"
      >
        <MessageSquare className="size-6 " />
        <p>12</p>
      </div>
      <div
        className=" flex flex-row items-center  gap-1
      text-white border-[1px] backdrop-blur-3xl bg-white/30 py-[2px] px-2 rounded-xl"
      >
        <Paperclip className="size-6 " />
        <p>2</p>
      </div>
      </div>
    </footer>
  );
};

export default TaskFooter;
