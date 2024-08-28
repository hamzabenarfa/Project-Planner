
interface CircleProgressProps {
  progress: number;
}

const CircleProgress = ({ progress } :CircleProgressProps) => {
  const totalCircles = 10;
  const filledCircles = Math.round((progress / 100) * totalCircles);

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between items-center text-blue-400">
        <h3 className="text-md font-medium">Progress</h3>
        <span className="text-md font-medium">40%</span>
      </div>
      <div className="flex items-center justify-between  gap-1 w-full">
        {Array.from({ length: totalCircles }, (_, i) => (
          <div
            key={i}
            className={`w-5 h-5 rounded-full ${
              i < filledCircles ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CircleProgress;
