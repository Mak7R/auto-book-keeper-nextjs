import RegisterComponent from "@/components/auth/register-component/register-component";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Register",
}

export default function () {  
  return (
    <div className="container-md mt-5">
      <RegisterComponent />
    </div>
  );
}
