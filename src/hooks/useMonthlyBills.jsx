import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosConfig";
const useMonthlyBills = (month,year) => {
    // console.log(month,year)
  const {
    data: monthlyBillsData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["monthlyBillsData", month, year],
    queryFn: async () => {
      const res = await axiosInstance.get(`/monthlyBill?month=${month}&year=${year}`)
      return res.data;
    },
  });
  return [monthlyBillsData, isLoading, refetch];
};

export default useMonthlyBills;
