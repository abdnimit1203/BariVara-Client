import Lottie from "lottie-react";
import loaderAnimation from "../../public/dash_calc_anim.json"; // adjust path
import useMonthlyBills from "../hooks/useMonthlyBills";
import MonthlyBillSelector from "../components/MonthlyBillSelector/MonthlyBillSelector";

const Dashboard = () => {
    const date = new Date()
    console.log(date.getMonth())
  const [monthlyBillsData, isLoading4, refetch4] = useMonthlyBills(
    "March",
    2025
  );
  console.log(monthlyBillsData)
  return (
    <div className="">
      <div className="flex text-center  bg-gradient-to-tr from-primary via-cyan-400 to-white justify-between items-center px-8">
        <div>
          <h2 className="font-semibold text-left">
            Welcome to <br />
            <span className="text-white text-xl">Dashboard</span>
          </h2>
        </div>
        <div>
          <Lottie
            animationData={loaderAnimation}
            loop={true}
            className="w-32 h-32"
          />
        </div>
      </div>

      
      <div>
        <MonthlyBillSelector/>
      </div>
    </div>
  );
};

export default Dashboard;
