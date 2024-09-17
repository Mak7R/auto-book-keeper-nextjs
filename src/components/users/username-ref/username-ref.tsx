import {getUsersService} from "@/services/providers/service-providers";
import LoadingPlaceholder from "@/components/ui/loading/loading-placeholder";
import {useQuery} from "@tanstack/react-query";

interface UsernameRefProps {
  userId: string
}

export default function UsernameRef(props: UsernameRefProps) {
  const usersService = getUsersService();

  const {data, isLoading} = useQuery({
    queryKey: ['users', props.userId],
    queryFn: () => usersService.getById(props.userId)
  })
  
  return (
    <>
      { isLoading ?
        <LoadingPlaceholder className="col-6" /> :
        <a>{data ? data.userName : "undefined"}</a>
      }
    </>
  );
}