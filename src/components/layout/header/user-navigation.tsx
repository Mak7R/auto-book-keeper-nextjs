'use client';

import Link from 'next/link';

import { useAppContext } from '@/contexts/AppContext';
import { getAuthService } from '@/services/providers/service-providers';
import {useRouter} from "next/navigation";

const authService = getAuthService();

export default function UserNavigation() {
	const { user, setUser } = useAppContext();
	const {push} = useRouter();
	
	const handleLogout = () => {
		authService.logout().then(_ => setUser(null));
		push("/");
	};

	return (
		<ul className='navbar-nav'>
			{user ? (
				<>
					<li className='nav-item'>
						<Link className='nav-link' href='/profile'>
							Profile
						</Link>
					</li>

					<li className='nav-item'>
						<button className='nav-link' onClick={handleLogout}>
							Logout
						</button>
					</li>
				</>
			) : (
				<>
					<li className='nav-item'>
						<Link className='nav-link' href='/login'>
							Login
						</Link>
					</li>

					<li className='nav-item'>
						<Link className='nav-link' href='/register'>
							Register
						</Link>
					</li>
				</>
			)}
		</ul>
	);
}
