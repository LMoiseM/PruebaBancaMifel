import { useState } from 'react';
import axios from 'axios';


const usePost = <T>(url: string) => {
  const [responseData, setResponseData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const postData = async (body: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<T>(url, body);
      setResponseData(response.data);
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

  return { responseData, error, loading, postData };
};

export default usePost;