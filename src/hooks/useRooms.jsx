import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosConfig";
const useRooms = () => {
 
  const {
    data: rooms = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/rooms`
      );
      return res.data;
    },
  });
  return [rooms, isLoading, refetch];
};

export default useRooms;
