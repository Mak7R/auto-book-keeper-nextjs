import BooksList from "@/components/books/books-list/books-list";
import AuthRequired from "@/components/helpers/auth-required/auth-required";
import {config} from "@/config/config";

export default function BooksPage() {
	
	return (
		<>
			<AuthRequired returnUrl={config.localUrls.books.all()}/>
			<div className='container-lg mt-3'>
				<BooksList/>
			</div>
		</>
	);
}
