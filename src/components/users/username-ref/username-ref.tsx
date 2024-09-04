import React, {useEffect, useState} from 'react';
import {getUsersService} from "@/services/providers/service-providers";
import {User} from "@/types/user";
import Loading from "@/components/ui/loading/loading";

interface UsernameRefProps {
  userId: string
}

export default function UsernameRef(props: UsernameRefProps) {
  const usersService = getUsersService();
  
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    usersService
      .getById(props.userId)
      .then(u => setUser(u))
      .catch(e => console.error(e));
  }, []);
  
  return (
    <>
      { user ? <a>{user.userName}</a> : <Loading />}
    </>
  );
}