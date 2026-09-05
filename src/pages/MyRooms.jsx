import HeaderText from "../utils/HeaderText";
import HouseMap from "../components/HouseMap/HouseMap";

const MyRooms = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-[calc(100vh-160px) ">
      <HeaderText
        title={"নুরেজা ভিলা"}
        subTitle={"Holding:31 , Syed Ali munsi Road"}
      />

      <p className="text-xl text-center font-bold bg-red-500 w-fit mx-auto px-5 pt-5  mb-2 rounded-t-full text-white">MAP</p>
      <img
        src="/compass.png"
        alt="compass"
        className="rounded-full border-2 z-20 border-red-600 pw w-16 fixed bottom-4 right-6 hover:animate-spin bg-[#ffffffe7]"
      />
      <div className="h-12 w-full bg-sky-950 relative ">
        <span className="w-full h-1  border-dotted border-2 absolute top-[45%]"></span>
        <span className="absolute bg-white p-1 rounded-lg text-xs font-semibold left-2 top-3 text-black " >⬅Noagao</span>
        <span className="absolute bg-white p-1 rounded-lg text-xs font-semibold right-2 top-3 text-black ">Anwarsilk ➡</span>
      </div>
      <section className="w-fit  mx-auto ">
        <HouseMap />
      </section>
    </div>
  );
};

export default MyRooms;
