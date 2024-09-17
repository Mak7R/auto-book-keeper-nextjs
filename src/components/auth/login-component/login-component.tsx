'use client'

import React, {ChangeEvent, Suspense, useState} from 'react';
import FormField from "@/components/ui/form/FormField";
import ErrorsList from "@/components/ui/form/ErrorsList";
import {getAllErrorsExclude, ProblemResponse} from "@/types/problem-response";
import SubmitButton from "@/components/ui/form/SubmitButton";
import {LoginModel} from "@/store/slices/auth-slice/auth-actions";
import {useRouter, useSearchParams} from "next/navigation";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store";
import {login as loginAction} from "@/store/slices/auth-slice/auth-actions";
import Loading from "@/components/ui/loading/loading";

interface LoginComponentProps {
  
}

function PrivateLoginComponent(props: LoginComponentProps) {
  const [loginModel, setLoginModel] = useState<LoginModel>({userName: '', password: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [problem, setProblem] = useState<ProblemResponse | null>(null);
  
  const dispatch = useDispatch<AppDispatch>();
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginModel(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const handleLogin = async () => {
    setIsLoading(true)

    const loginProblem = await dispatch(loginAction(loginModel))

    if (loginProblem){setProblem(loginProblem)}
    else{
      const returnUrl = searchParams.get('returnUrl') || '/'
      router.replace(returnUrl)
    }
    setIsLoading(false)
  }
  
  return (
    <>
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
    </>
  );
}

export default function LoginComponent(props: LoginComponentProps){
  return (
    <Suspense fallback={<Loading/>}>
      <PrivateLoginComponent {...props}/>
    </Suspense>
  )
}