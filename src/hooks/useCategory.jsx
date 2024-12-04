import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosConfig";

const useCategory = (cat) => {
  const queryKey = cat ? ["category", cat] : ["categories"];
  const queryFn = async () => {
    const url = cat ? `/categories?cat=${cat}` : `/categories`;
    const res = await axiosInstance.get(url);
    return res.data;
  };

  const {
    data: categorys = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey,
    queryFn,
  });

  return [categorys, isLoading, refetch];
};

export default useCategory;
