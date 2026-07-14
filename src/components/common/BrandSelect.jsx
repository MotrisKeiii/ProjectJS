"use client"
import { getBrands } from '@/services/brandService';
import { useEffect, useState } from 'react'
import Select from './Select';

export default function BrandSelect(props) {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await getBrands({trash:0});
                const list = Array.isArray(data) ? data : data?.data || data?.brands || [];
                setBrands(list)

            } 
            catch (e) {
                setError(e.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])

  return (
    <Select
      {...props}
      options={brands}
      valueKey="brand_id"
      labelKey="brand_name"
      placeholder={loading ? "Dang tai brand..." : error || "-- Chon brand --"}
      disabled={loading || Boolean(error)}
      className="w-full border rounded-lg px-3 py-2"
    />
  )
}
