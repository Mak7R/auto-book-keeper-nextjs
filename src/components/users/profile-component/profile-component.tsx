import React from 'react';
import {useTypedSelector} from "@/hooks/use-typed-selector";
import {useQuery} from "@tanstack/react-query";
import {getUsersService} from "@/services/providers/service-providers";
import LoadingPlaceholder from "@/components/ui/loading/loading-placeholder";

export default function ProfileComponent() {
  const userId = useTypedSelector(state => state.auth.userId)

  const {data} = useQuery({
    queryKey: ['users', userId],
    queryFn: () => getUsersService().getById(userId!)
  })
  
  return (
    <>
      <h1 className='text-center'>Profile</h1>

      <p className='fs-5'>
        Id: {data ? <>{data.id}</> : <LoadingPlaceholder className="col-6"/>}
      </p>
      <p className='fs-4'>
        Name: {data ? <>{data.userName}</> : <LoadingPlaceholder className="col-6"/>}
      </p>
      <p className='fs-4'>
        Email: {data ? <>{data.email}</> : <LoadingPlaceholder className="col-6"/>}
      </p>
    </>
  );
}