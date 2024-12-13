function Subjects() {
  const subjects = [
    {
      _id: "673db88214ca337631ef34c6",
      name: "Competitive Programming",
      path: "/Competitive Programming.jpg",
      description:
        "Dive into algorithmic challenges and problem-solving techniques that test your programming skills under time constraints. Master data structures, algorithms, and coding strategies to excel in contests.",
    },
    {
      _id: "673db9fec35410d043d65647",
      name: "Computer Vision",
      path: "/Computer Vision.jpg",
      description:
        "Unlock the potential of artificial intelligence by learning how to process, analyze, and understand visual data using cutting-edge tools and techniques.",
    },
    {
      _id: "673dba15c35410d043d65649",
      name: "Arduino",
      path: "/Arduino.jpg",
      description:
        "Delve into the world of electronics and microcontrollers with Arduino. Create interactive projects and bring your innovative ideas to life through hands-on programming and prototyping.",
    },
    {
      _id: "673dd45523150842ad2be2ac",
      name: "Python",
      path: "/Python Programming.jpg",
      description:
        "Explore the versatility of Python, a user-friendly programming language perfect for web development, data analysis, machine learning, and automation.",
    },
    {
      _id: "675c927a0962f5564cc97029",
      name: "Fast Arithmetic",
      path: "/Fast Arithmetic.jpg",
      description: "Learn how to calculate arithmetic operation faster!",
    },
  ];

  return (
    <div className="flex flex-wrap align-center justify-center bg-customWhite">
      {subjects.map((subject) => {
        return (
          <div className="justify-center align-center text-center py-10 p-3 mx-5 md:basis-2/5">
            <h1 className="font-bold text-2xl">{subject.name}</h1> <br />
            <img className="rounded-2xl" src={subject.path} /> <br />
            <p>{subject.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Subjects;
