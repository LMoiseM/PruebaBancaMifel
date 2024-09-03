import { useState, useEffect } from 'react';
import axios from 'axios';

type FetchState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};


const useFetch = <T>(url: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data?.message || err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('A ocurrido un error');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
