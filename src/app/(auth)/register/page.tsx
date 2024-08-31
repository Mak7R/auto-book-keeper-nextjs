'use client'

import {ChangeEvent, useState} from "react";
import {getAuthService} from "@/services/providers/service-providers";
import {useAppContext} from "@/contexts/AppContext";
import {useRouter} from "next/navigation";
import ErrorsList from "@/components/ui/form/ErrorsList";
import {getAllErrorsExclude, ProblemResponse} from "@/types/problem-response";
import FormField from "@/components/ui/form/FormField";

class RegisterModel{
  userName: string = ""
  email: string = ""
  password: string = ""
}

const authService = getAuthService();

export default function () {
  const [registerModel, setRegisterModel] = useState(new RegisterModel());
  const [isLoading, setIsLoading] = useState(false);
  const [problem, setProblem] = useState<ProblemResponse | null>(null);
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterModel(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const {setUser} = useAppContext();
  const {replace} = useRouter();
  
  const handleRegister = async () => {
    setIsLoading(true);

    // todo validation
    
    const result = await authService.register(registerModel.userName, registerModel.email, registerModel.password);
      
    if (!result){
      setUser(authService.currentUser);
      replace("/");
    }
    else{
      setProblem(result);
    }
    
    setIsLoading(false);
  }
  
  return (
    <div className="container-md m-1">
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
        <button className="btn btn-success" onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}
