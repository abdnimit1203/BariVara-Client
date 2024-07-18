import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosConfig";

const useRooms = (roomNo) => {
  const queryKey = roomNo ? ["room", roomNo] : ["rooms"];
  const queryFn = async () => {
    const url = roomNo ? `/rooms?roomNo=${roomNo}` : `/rooms`;
    const res = await axiosInstance.get(url);
    return res.data;
  };

  const {
    data: rooms = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey,
    queryFn,
  });

  return [rooms, isLoading, refetch];
};

export default useRooms;
