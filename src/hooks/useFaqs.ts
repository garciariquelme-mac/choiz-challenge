import { useState, useEffect } from 'react';
import { FAQ, UseFaqsReturn } from '../types';

export function useFaqs(): UseFaqsReturn {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFaqs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('https://679938bebe2191d708b25ceb.mockapi.io/api/faqs');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setFaqs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar las FAQs');
      console.error('Error fetching FAQs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const refetch = () => {
    fetchFaqs();
  };

  return {
    faqs,
    isLoading,
    error,
    refetch,
  };
}
