// pages/index.js

import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className=" text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 text-teal-400">
            Elevate Your Startup with Essential Tools
          </h1>
          <p className="text-lg mb-8">
            Everything Your Team Needs to Collaborate and Innovate
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Task Management</h2>
              <p className="text-lg">
                Streamline workflows and stay organized with intuitive task
                management solutions.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Scrum Boards</h2>
              <p className="text-lg">
                Plan, track, and iterate seamlessly with agile Scrum boards.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Design Collaboration</h2>
              <p className="text-lg">
                Bring your ideas to life with collaborative design tools like
                Figma.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">UML Diagrams</h2>
              <p className="text-lg">
                Visualize and communicate complex ideas with Mermaid for UML
                diagrams.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg col-span-2">
              <h2 className="text-2xl font-bold mb-4">AI-Powered Insights</h2>
              <p className="text-lg">
                Leverage AI to enhance productivity and make data-driven
                decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
