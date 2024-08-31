'use client';

import { useAppContext } from '@/contexts/AppContext';
import { getAuthService } from '@/services/providers/service-providers';
import {useRouter} from "next/navigation";

const authService = getAuthService();

export default function ProfilePage() {
	const { user } = useAppContext();
	const {push} = useRouter();
	
	if (!user){
		push("/login");
	}
	
	return (
		<>
			<div className='container'>
				<h1 className='text-center'>Profile</h1>

				<p className='fs-5'>
					Id: {user ? <>{user.id}</> : <>Loading</>}
				</p>
				<p className='fs-4'>
					Name: {user ? <>{user.userName}</> : <>Loading</>}
				</p>
				<p className='fs-4'>
					Email: {user ? <>{user.email}</> : <>Loading</>}
				</p>
			</div>
		</>
	);
}
