import { Link } from "react-router-dom";

function MiniAbout() {
  return (
    <div class="flex flex-col flex-wrap bg-customWhite md:flex-row">
      <div class="flex flex-col align-center justify-center text-center p-20 w-full md:w-1/3">
        <h1 class="text-2xl font-bold">About Me</h1>
        <br />
        <p>
          I'm Jansen Ken Pegrasio, <br />
          an Electrical Engineering undergraduate <br />
          at the National University of Singapore. <br /> <br />
          I'm really fascinated with the beauty of technology <br />
          and longed to share and contribute to society <br /> <br/>
        </p>
      </div>
      <div class="hidden bg-tech-background bg-cover bg-center md:w-2/3 md:block"></div>
    </div>
  );
}

export default MiniAbout;
