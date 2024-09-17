'use client';

import {useEffect, useState} from "react";
import NavLinkItem from "@/components/layout/header/nav-link-item/nav-link-item";

import {useDispatch} from "react-redux";
import {logout as logoutAction} from "@/store/slices/auth-slice/auth-actions";
import {AppDispatch} from "@/store";
import {useTypedSelector} from "@/hooks/use-typed-selector";

export default function UserNavigation() {
	const dispatch = useDispatch<AppDispatch>();
	
	const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)

	// fix of problem: server and client has different html
	const [isLoggedInLocal, setIsLoggedInLocal] = useState<boolean>(false);
	useEffect(() => {
		setIsLoggedInLocal(isLoggedIn);
	}, [isLoggedIn]);

	return (
		<ul className='navbar-nav'>
			{isLoggedInLocal ? (
				<>
					<NavLinkItem href="/profile">Profile</NavLinkItem>

					<li className='nav-item'>
						<button className='nav-link' onClick={() => dispatch(logoutAction())} data-bs-dismiss="offcanvas">
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
