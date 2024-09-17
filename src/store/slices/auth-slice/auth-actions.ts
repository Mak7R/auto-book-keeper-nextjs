import {authActions} from "@/store/slices/auth-slice/auth-slice";
import {getAuthService} from "@/services/providers/service-providers";
import {AppDispatch} from "@/store";
import {ProblemResponse} from "@/types/problem-response";

const authService = getAuthService();

const getUserId = () => authService.userId ? authService.userId : undefined;

export interface LoginModel{
  userName: string
  password: string
}
export function login(payload: LoginModel) {
  return async (dispatch: AppDispatch) => {
    try{
      const problem = await authService.login(payload.userName, payload.password);
      
      if (!problem){
        dispatch(authActions.setIsLoggedIn(true))
        dispatch(authActions.setUserId(getUserId()));
        return null;
      }
      else{
        return problem;
      }
    }
    catch (error){
      console.error("Error during login", error);
      // todo errors handling
      return new ProblemResponse()
    }
  }
}

export interface RegisterModel{
  userName: string
  email: string
  password: string
}

export function register(payload: RegisterModel) {
  // todo login logic
  return async (dispatch: AppDispatch) => {
    try{
      const problem = await authService.register(payload.userName, payload.email, payload.password);

      if (!problem){
        dispatch(authActions.setIsLoggedIn(true))
        dispatch(authActions.setUserId(getUserId()));
        return null;
      }
      else{
        return problem;
      }
    }
    catch (error){
      console.error("Error during login", error);
      // todo errors handling
      return new ProblemResponse()
    }
  }
}

export function logout() {
  return async (dispatch: AppDispatch) => {
    try {
      await authService.logout();
      dispatch(authActions.setIsLoggedIn(false));
      dispatch(authActions.setUserId(getUserId()));
    } catch (error) {
      console.error('Error during logout: ', error);
    }
  };
}