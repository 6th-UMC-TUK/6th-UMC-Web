import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import SearchBar from './SearchBar';
import { AuthContext } from './AuthProvider';
import { useLoading } from './LoadingProvider';

const MainPage = () => {
  const [auth] = useContext(AuthContext);
  const { loading, setLoading } = useLoading();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });

        if (response.status === 200) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      } finally {
        setLoading(false);
      }
    };

    if (auth.isAuthenticated) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [auth, setLoading]);

  const bannerMessage = auth.isAuthenticated ? (loading ? "로딩 중..." : `${userData?.name}님 환영합니다.`) : "환영합니다.";

  return (
    <div>
      <Navbar />
      <Banner message={bannerMessage} />
      <SearchBar />
    </div>
  );
};

export default MainPage;
