'use client';

import Link from 'next/link';

import { useAppContext } from '@/contexts/AppContext';
import { getAuthService } from '@/services/providers/service-providers';
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import NavLinkItem from "@/components/layout/header/nav-link-item/nav-link-item";

const authService = getAuthService();

export default function UserNavigation() {
	const { user, setUser } = useAppContext();
	const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);
	const {push} = useRouter();

	useEffect(() => {
		if (user){
			setIsLoggedIn(true);
		}
	}, []);
	
	const handleLogout = () => {
		authService.logout().then(_ => setUser(null));
		push("/");
	};

	return (
		<ul className='navbar-nav'>
			{isLoggedIn && user ? (
				<>
					<NavLinkItem href="/profile">Profile</NavLinkItem>

					<li className='nav-item'>
						<button className='nav-link' onClick={handleLogout} data-bs-dismiss="offcanvas">
							Logout
						</button>
					</li>
				</>
			) : (
				<>
					<NavLinkItem href="/login">Login</NavLinkItem>
					<NavLinkItem href="/register">Register</NavLinkItem>
				</>
			)}
		</ul>
	);
}
