import axios from 'axios';
import { useEffect, useState } from 'react';

export default function loginHook(email, password, submit) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (submit) {
      setLoading(true);
      setError(false);
      axios({
        method: 'GET',
        url: 'http://www.mocky.io/v2/5d9d9219310000153650e30b',
      }).then((res) => {
        setResult(res.data);
        setLoading(false);
      }).catch((err) => {
        setError(true);
      });
    }
    
  }, [submit]);

  return { loading, result, error };
}