import TaskCard from "./TaskCard";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 py-10">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-left mb-5">Smarter Tasks</h1>

        <div className="flex text-left mb-10">
        <p className="font-semibold mr-2">Project:</p>
        <p>Graduation Final Year Project (Revamp College Website)</p>
      </div>
      </div>

      <div className="flex gap-10 w-full max-w-4xl justify-center">
        <div className="flex-1 border-[2.5px] border-gray-500 rounded-xl p-6 bg-white shadow-md pb-20">
          <h1 className="text-center text-xl font-bold text-gray-500 mb-6">Pending</h1>
          <TaskCard 
            title="Build the website with static content"
            dueDate="10th April"
            assigneeName="Rohit S" 
          />
          <TaskCard 
            title="Add blog"
            dueDate="22nd March"
            assigneeName="Rohit M" 
          />

          <div className="text-gray-500 rounded font-bold w-full bg-gray-200 mt-6 p-1">
            + New Task
          </div>
        </div>

        <div className="flex-1 border-[2.5px] border-gray-500 rounded-xl p-6 bg-white shadow-md pb-20">
          <h1 className="text-center text-xl font-bold text-gray-500 mb-6">Done</h1>
          <TaskCard 
            title="Design the mockup"
            completedAtDate="10th April"
            assigneeName="Rohit M"
          />
          <TaskCard 
            title="Get approval from principal"
            completedAtDate="20th April"
            assigneeName="Ajay S" 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
