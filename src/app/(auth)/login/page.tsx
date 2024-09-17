import LoginComponent from "@/components/auth/login-component/login-component";
import {Metadata} from "next";
import React from "react";


export const metadata: Metadata = {
	title: "Login",
}

export default function LoginPage() {
	return (
		<div className='container-md mt-5'>
				<LoginComponent />
		</div>
	);
}
