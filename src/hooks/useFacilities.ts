import { useEffect, useState } from "react";
import { getFacilities } from "../api/modules/facilities";

export function useFacilities() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getFacilitiesList = async () => {
    setLoading(true);
    try {
      const resposne = await getFacilities();
      console.log(resposne);
      setData(resposne.data.facilities);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    getFacilitiesList();
  }, []);

  return { data, loading };
}