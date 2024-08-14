import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app, { db } from '../configs/Firebase';

interface UserDetails {
    email: string;
    name: string;
    uid: string;
    password: string;
}

export default function useUserDetails() {
  const [userDetails, setUserDetails] = useState <UserDetails | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);
  const noUserData = userDetails == null;

  const getUserDetails = async (uid: string) => {
    setLoading(true);
    try {
      const docRef = doc(db, 'User', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserDetails(docSnap.data() as any);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setIsLoggedIn(true);
        getUserDetails(user.uid);
      } else {
        setIsLoggedIn(false);
        setUserDetails(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return { userDetails, isLoggedIn, noUserData, loading };
}
