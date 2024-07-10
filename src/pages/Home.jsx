import HouseMap from "../components/HouseMap/HouseMap";
import HeaderText from "../utils/HeaderText";

const Home = () => {
  return (
    <div className="max-w-[500px] mx-auto">
      <HeaderText
        title={"NURAJA BEGUM"}
        subTitle={"Holding:31 , Syed Ali munsi Road"}
      />
    
        <h2 className="text-xl text-center font-bold">MAP</h2>
        <img
          src="compass.png"
          alt="compass"
          className="rounded-full border-2 border-red-600 pw w-16 fixed bottom-4 right-6 hover:animate-spin bg-[#ffffffe7]"
        />

      <HouseMap />
    </div>
  );
};

export default Home;
