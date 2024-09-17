import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {config} from "@/config/config";
import {useTypedSelector} from "@/hooks/use-typed-selector";


export const useAuthorize = (returnUrl?: string) => {
  const router = useRouter();
  const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)
  useEffect(() => {
    if (!isLoggedIn) {
      let url = config.localUrls.auth.login();
      if (returnUrl) url += `?returnUrl=${returnUrl}`
      router.push(url);
    }
  }, [isLoggedIn]);
  
  return {isLoggedIn}
}