'use client'

import React, {ChangeEvent, useState} from 'react';
import FormField from "@/components/ui/form/FormField";
import ErrorsList from "@/components/ui/form/ErrorsList";
import {getAllErrorsExclude, ProblemResponse} from "@/types/problem-response";
import {register as registerAction, RegisterModel} from "@/store/slices/auth-slice/auth-actions";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store";
import {useRouter} from "next/navigation";

interface RegisterComponentProps {
  returnUrl?: string
}

export default function RegisterComponent(props: RegisterComponentProps) {
  const [registerModel, setRegisterModel] = useState<RegisterModel>({
    userName: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [problem, setProblem] = useState<ProblemResponse | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterModel(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const router = useRouter();
  const handleRegister = async () => {
    setIsLoading(true);

    const registerProblem = await dispatch(registerAction(registerModel))

    if (registerProblem){setProblem(registerProblem);}
    else{
      const returnUrl = props.returnUrl || '/'
      router.replace(returnUrl)
    }

    setIsLoading(false);
  }
  
  return (
    <>
      <h1 className="text-center mt-2">Register</h1>
      <div className="mb-3">
        <FormField
          label='Username: '
          name='userName'
          onChange={handleInputChange}
          errors={problem?.errors ? problem.errors.UserName : null} />
      </div>

      <div className="mb-3">
        <FormField
          label='Email: '
          name='email'
          type='email'
          onChange={handleInputChange}
          errors={problem?.errors ? problem.errors.Email : null} />
      </div>

      <div className="mb-3">
        <FormField
          label='Password: '
          name='password'
          type='password'
          onChange={handleInputChange}
          errors={problem?.errors ? problem.errors.Password : null} />
      </div>

      {
        problem &&
        <div className='mb-3'>
          <ErrorsList
            errors={ problem.errors ?
              getAllErrorsExclude(problem.errors, ["UserName", "Password", "Email"]) :
              [problem?.detail ?? "Error was occurred while processing your request"]}
          />
        </div>
      }

      <div className="mb-3">
        <button className="btn btn-success" onClick={handleRegister} disabled={isLoading}>Register</button>
      </div>
    </>
  );
}