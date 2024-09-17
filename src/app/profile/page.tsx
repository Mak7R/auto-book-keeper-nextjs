'use client';

import ProfileComponent from "@/components/users/profile-component/profile-component";
import AuthRequired from "@/components/helpers/auth-required/auth-required";
import {config} from "@/config/config";

export default function ProfilePage() {
		return (
		<>
			<AuthRequired returnUrl={config.localUrls.users.profile()}/>
			<div className='container mt-3'>
				<ProfileComponent/>
			</div>
		</>
	);
}
