import  { createContext, useContext, useEffect, useState } from 'react';
import { BloodRequestList } from "@/types";
import { fetchBloodRequests } from '@/services/bloodRequestApi';

interface BloodRequestContextType {
  bloodRequests: BloodRequest[];
  loading: boolean;
  error: string | null;
  refreshRequests: () => Promise<void>;
}

const BloodRequestContext = createContext<BloodRequestContextType | undefined>(undefined);

export const BloodRequestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bloodRequests, setBloodRequests] = useState<BloodRequestList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchBloodRequests();
      setBloodRequests(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blood requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BloodRequestContext.Provider 
      value={{ 
        bloodRequests, 
        loading, 
        error,
        refreshRequests: fetchData 
      }}
    >
      {children}
    </BloodRequestContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBloodRequests = () => {
  const context = useContext(BloodRequestContext);
  if (context === undefined) {
    throw new Error('useBloodRequests must be used within a BloodRequestProvider');
  }
  return context;
};