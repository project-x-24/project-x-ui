function HomePage({ name }) {
  const categories = [
    { name: "Work", bgStyle: "bg-gradient-to-r from-[#7dc8e7] to-[#7dc8e7b0]" },
    { name: "Personal", bgStyle: "bg-gradient-to-r from-[#7D88E7] to-[#8C96F0A3]" },
    { name: "Fitness", bgStyle: "bg-gradient-to-r from-[#E77D7D] to-[#E77D7DB5]" },
    { name: "Finance", bgStyle: "bg-gradient-to-r from-[#498A5B] to-[#7ACB90]" },
  ];

  const notes = ["Buy groceries", "Finish project", "Workout at 6pm", "Budget planning"]; // Example notes

  return (
    <div className="min-h-screen p-6 w-screen bg-white">
      {/* Greeting */}
      <div className="text-[18px] leading-7 font-[500] mb-6">Hi {name} 👋</div>

      {/* Emoji & Question */}
      <div className="mb-8 flex flex-col border-[1px] p-6 rounded-[12px] border-[#EB5017] items-center">
        <h2 className="text-[16px] font-[500] w-full mb-4">How are you feeling today?</h2>
        <div className="flex space-x-4">
          <span className="text-3xl cursor-pointer">😀</span>
          <span className="text-3xl cursor-pointer">😢</span>
          <span className="text-3xl cursor-pointer">😡</span>
          <span className="text-3xl cursor-pointer">😎</span>
          <span className="text-3xl cursor-pointer">🤔</span>
        </div>
        <span className="text-[14px] text-[#969696] my-4">Tap to share your mood</span>
      </div>

      {/* Categories */}
      <span className="text-[16px] font-[500] text-[#1C1C1C] mb-4">Categories</span>
      <div className="grid grid-cols-2 gap-4 my-5">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`p-6 rounded-[14px] h-[163px] shadow-md flex justify-center items-center font-bold text-center text-white ${category.bgStyle}`}
          >
            {category.name}
          </div>
        ))}
      </div>

      {/* Notes */}
      <h2 className="text-xl font-semibold mb-4">Notes</h2>
      <div className="space-y-4">
        {notes.map((note, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <span>{note}</span>
            <input type="checkbox" className="h-5 w-5" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
