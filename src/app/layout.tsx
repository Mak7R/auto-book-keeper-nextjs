import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

import ImportBootstrap from '@/components/imports/import-bootstrap';
import Footer from '@/components/layout/footer/footer-component';
import Header from '@/components/layout/header/header-component';
import { AppWrapper } from '@/contexts/AppContext';
import Main from "@/components/layout/main/main-component";

const layoutFontStyle = JetBrains_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'AutoBookKeeper',
	description: 'AutoBookKeeper is a web application designed for keeping track of expenses and calculating budget characteristics.',
};

interface RootLayoutProps {
	children?: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
	return (
		<html lang='en'>
			<body className={layoutFontStyle.className + " d-flex flex-column"} style={{minHeight: '100vh'}}>
				<AppWrapper>
					<ImportBootstrap />
					<Header />
					<Main>
						{props.children}
					</Main>
					<Footer />
				</AppWrapper>
			</body>
		</html>
	);
}
