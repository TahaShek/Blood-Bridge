// src/providers/BloodRequestProvider.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { BloodRequestList } from "@/types";
import { fetchBloodRequests } from '@/services/bloodRequestApi';

interface BloodRequestContextType {
  bloodRequests: BloodRequestList[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  } | null;
  refreshRequests: (filters?: BloodRequestFilters) => Promise<void>;
}

interface BloodRequestFilters {
  search?: string;
  bloodGroup?: string;
  urgencyLevel?: string;
  page?: number;
  limit?: number;
}

const BloodRequestContext = createContext<BloodRequestContextType | undefined>(undefined);

export const BloodRequestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bloodRequests, setBloodRequests] = useState<BloodRequestList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<BloodRequestContextType['pagination']>(null);

  const refreshRequests = async (filters: BloodRequestFilters = { page: 1, limit: 6 }) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, pagination: paginationData } = await fetchBloodRequests(filters);
      
      setBloodRequests(data);
      setPagination(paginationData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blood requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshRequests();
  }, []);

  return (
    <BloodRequestContext.Provider 
      value={{ 
        bloodRequests, 
        loading, 
        error,
        pagination,
        refreshRequests,
      }}
    >
      {children}
    </BloodRequestContext.Provider>
  );
};

export const useBloodRequests = () => {
  const context = useContext(BloodRequestContext);
  if (context === undefined) {
    throw new Error('useBloodRequests must be used within a BloodRequestProvider');
  }
  return context;
};