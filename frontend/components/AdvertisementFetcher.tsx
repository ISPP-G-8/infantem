import React, { useState, useEffect } from 'react';
import AdBanner from './AdBanner'; 
import { Ad } from '../types';
import { useAuth } from '../context/AuthContext';

const AdvertisementFetcher: React.FC = () => {
  const [advertisement, setAdvertisement] = useState<Ad | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuth();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const fetchAdvertisement = async () => {
      try {
        setIsLoading(true);
        
        const response = await fetch(`${apiUrl}/api/v1/advertisements/toShow`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        if (Object.keys(data).length > 0) {
          setAdvertisement(data);
        } else {
          setAdvertisement(null);
        }
      } catch (err) {
        setError('Failed to fetch advertisement');
        console.error('Advertisement fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdvertisement();
  }, []); 

  if (isLoading) {
    return null; 
  }

  if (error) {
    console.error(error);
    return null;
  }

  if (!advertisement) {
    return null;
  }

  return <AdBanner {...advertisement} />;
};

export default AdvertisementFetcher;
