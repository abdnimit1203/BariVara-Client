import HouseMap from "../components/HouseMap/HouseMap";
import HeaderText from "../utils/HeaderText";

const Home = () => {
  return (
    <div className="max-w-[500px] mx-auto">
      <HeaderText
        title={"NURAJA BEGUM"}
        subTitle={"Holding:31 , Syed Ali munsi Road"}
      />

      <h2 className="text-xl text-center font-bold bg-red-500 w-fit mx-auto px-5 pt-5  mb-2 rounded-t-full text-white">MAP</h2>
      <img
        src="compass.png"
        alt="compass"
        className="rounded-full border-2 border-red-600 pw w-16 fixed bottom-4 right-6 hover:animate-spin bg-[#ffffffe7]"
      />
      <div className="h-12 w-full bg-sky-950 relative">
        <span className="w-full h-1  border-dotted border-2 absolute top-[45%]"></span>
        <span className="absolute bg-white p-1 rounded-lg text-xs font-semibold left-2 top-3">⬅Noagao</span>
        <span className="absolute bg-white p-1 rounded-lg text-xs font-semibold right-2 top-3">Anwarsilk ➡</span>
      </div>
      <HouseMap />
    </div>
  );
};

export default Home;
