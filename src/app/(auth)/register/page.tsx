import RegisterComponent from "@/components/auth/register-component/register-component";
import {Metadata} from "next";
import {useSearchParams} from "next/navigation";

export const metadata: Metadata = {
  title: "Register",
}

export default function () {
  const searchParams = useSearchParams();
  return (
    <div className="container-md mt-5">
      <RegisterComponent returnUrl={searchParams.get('returnUrl') ?? undefined}/>
    </div>
  );
}
