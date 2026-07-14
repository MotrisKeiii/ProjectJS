"use client"
import { getCategories } from '@/services/categoryService';
import { useEffect, useState } from 'react'
import Select from './Select';

export default function CategorySelect({ name, value, onChange }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await getCategories({trash:0});
                const list = Array.isArray(data) ? data : data?.data || data?.categories || [];
                setCategories(list);

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
    <div>
      {error ? (
        <p>{error}</p>
      ) : loading ? (
        "loading categories"
      ) : (
        <Select
          options={categories}
          valueKey="cat_id"
          labelKey="cat_name"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      )} 
    </div>
  );
}
