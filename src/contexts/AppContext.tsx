'use client';

import { createContext, useContext, useState } from 'react';

export type Context = {
	user: User | null;
	setUser: (user: User | null) => void;
};

const AppContext = createContext<Context>({ user: null, setUser: _ => {} });

export function AppWrapper({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	return <AppContext.Provider value={{ user, setUser}}>{children}</AppContext.Provider>;
}

export function useAppContext() {
	return useContext(AppContext);
}
