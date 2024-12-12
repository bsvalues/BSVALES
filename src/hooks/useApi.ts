import { useState, useEffect } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        const result = await apiCall();
        
        if (mounted) {
          setState({
            data: result,
            loading: false,
            error: null
          });
        }
      } catch (error) {
        if (mounted) {
          setState({
            data: null,
            loading: false,
            error: error as Error
          });
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, dependencies);

  return state;
}