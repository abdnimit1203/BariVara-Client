import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosConfig";
const useMonthlyMeterData = (month,year) => {
    console.log(month,year)
  const {
    data: monthlyData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["monthlyData"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/monthlyData?month=${month}&year=${year}`)
      return res.data;
    },
  });
  return [monthlyData, isLoading, refetch];
};

export default useMonthlyMeterData;
