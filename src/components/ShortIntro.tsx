function ShortIntro() {
  return (
    <div className="w-[80%] md:w-[50%] flex flex-col items-center justify-center bg-gray-50 text-gray-900 pt-8 mb-3">
      <div className="flex flex-col md:flex-row items-center w-full max-w-3xl p-6 bg-white rounded-2xl shadow-md">
        <div className="flex-shrink-0">
          <img
            src="./Icon.jpg"
            alt="Jansen Ken Pegrasio"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
          />
        </div>

        <div className="mt-2 md:mt-0 md:ml-6">
          <h1 className="text-xl md:text-3xl font-bold text-center md:text-left mb-1">Jansen Ken Pegrasio</h1>
          <p className="text-md md:text-lg text-gray-600 text-center md:text-left">Computer Engineering, iDP @ NUS</p>
        </div>
      </div>

      <div className="mt-6 w-full max-w-3xl p-6 bg-white rounded-2xl shadow-md text-justify">
        <p className="text-sm md:text-md text-gray-700">
          🔭 I’m currently working as a Summer Research Assistant Intern in NUS.{" "}
          <br />
          🌱 I’m currently learning Robotics, Software Engineering, and AI.{" "}
          <br />
          📖 I've won the 6th rank (Silver Medal) in Indonesian NOI 2023. <br />
          ⚡ In my free time, I like to produce music and explore new things!
        </p>
      </div>
    </div>
  );
}

export default ShortIntro;
