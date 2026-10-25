import profileService from "@/api/profileService";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => useQuery(
  {
    queryKey: ['profile'],
    queryFn: () => profileService.getProfile(),
    staleTime: Infinity,
  })
