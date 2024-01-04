import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetPlateByImage = () => {
  return useMutation({
    mutationFn: async (imageSrc: string) => {
      const res = await axios.post("http://localhost:5000/api/upload_image", {
        image: imageSrc,
      });
      return res.data;
    },
  });
};
