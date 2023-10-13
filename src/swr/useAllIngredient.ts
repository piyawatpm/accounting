import useSWR from "swr";
import { api } from "../../lib/axios";

export function useAllIngredient() {
  const fetcher = async (url:string) => await api.get(url).then((res) => res.data);

  return useSWR("/ingredients", fetcher);
}
