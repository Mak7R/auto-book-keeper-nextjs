'use client';

import { getAuthService } from '@/services/providers/service-providers';
import { ChangeEvent, useState } from 'react';
import {useAppContext} from "@/contexts/AppContext";
import {useRouter} from "next/navigation";
import type {Metadata} from "next";
import {getAllErrorsExclude, ProblemResponse} from "@/types/problem-response";
import FormField from "@/components/ui/form/FormField";
import SubmitButton from "@/components/ui/form/SubmitButton";
import ErrorsList from "@/components/ui/form/ErrorsList";

class LoginModel {
	userName: string = '';
	password: string = '';
}

const authService = getAuthService();


// export const metadata: Metadata = {
// 	title: "Login",
// }

export default function LoginPage() {
	const [loginModel, setLoginModel] = useState(new LoginModel());
	const [isLoading, setIsLoading] = useState(false);
	const [problem, setProblem] = useState<ProblemResponse | null>(null);
	const {setUser} = useAppContext();
	const router = useRouter();
	
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLoginModel(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleLogin = async () => {
		setIsLoading(true);
		
		// todo validation
		
		const result = await authService.login(
			loginModel.userName,
			loginModel.password,
		);
		
		if (!result) {
			setUser(authService.currentUser);
			router.replace("/");
		} else {
			setProblem(result);
		}
		
		setIsLoading(false);
	};

	return (
		<div className='container-md m-1'>
			<h1 className='text-center mt-2'>Login</h1>
			<div className='mb-3'>
				<FormField
					label='Username: '
					name='userName'
					onChange={handleInputChange}
					errors={problem?.errors ? problem.errors.UserName : null} />
			</div>

			<div className='mb-3'>
				<FormField
					label='Password: '
					name='password'
					onChange={handleInputChange}
					type='password'
					errors={problem?.errors ? problem.errors.Password : null} />
			</div>

			{
				problem && 
				<div className='mb-3'>
					<ErrorsList
						errors={ problem.errors ?
							getAllErrorsExclude(problem.errors, ["UserName", "Password"]) :
							[problem?.detail ?? "Error was occurred while processing your request"]}
					/>
				</div>
			}
			
			<div className='mb-3'>
				<SubmitButton isLoading={isLoading} handleClick={handleLogin}>Login</SubmitButton>
			</div>
		</div>
	);
}
