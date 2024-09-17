import LoginComponent from "@/components/auth/login-component/login-component";
import {Metadata} from "next";
import {useSearchParams} from "next/navigation";


export const metadata: Metadata = {
	title: "Login",
}

export default function LoginPage() {
	const searchParams = useSearchParams();
	return (
		<div className='container-md mt-5'>
			<LoginComponent returnUrl={searchParams.get('returnUrl') ?? undefined}/>
		</div>
	);
}
