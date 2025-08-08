import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const QueryParamContext = createContext();

export const useQueryParams = () => useContext(QueryParamContext);

export const QueryParamProvider = ({ children }) => {
  const location = useLocation();
  const [queryParams, setQueryParams] = useState('');

  useEffect(() => {
    if (location.search) {
      setQueryParams(location.search);
    }
  }, [location.search]);

  const value = { queryParams };

  return (
    <QueryParamContext.Provider value={value}>
      {children}
    </QueryParamContext.Provider>
  );
};