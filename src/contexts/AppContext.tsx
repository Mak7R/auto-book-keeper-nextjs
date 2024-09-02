'use client';

import {createContext, useContext, useEffect, useState} from 'react';
import {getAuthService} from "@/services/providers/service-providers";

export type Context = {
	user: User | null;
	setUser: (user: User | null) => void;
};

const AppContext = createContext<Context>({ user: null, setUser: _ => {} });


export function AppWrapper({ children }: { children: React.ReactNode }) {
	const authService = getAuthService();
	const [user, setUser] = useState<User | null>(authService.currentUser);
	
	return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
	return useContext(AppContext);
}
