'use client';

import { getBooksService } from '@/services/providers/service-providers';
import { useEffect, useState } from 'react';
import BooksListItem from "@/components/books/books-list-item";
import {useAppContext} from "@/contexts/AppContext";
import {useRouter} from "next/navigation";

const booksService = getBooksService();

export default function BooksPage() {
	const [books, setBooks] = useState<Book[]>([]);
	
	const {user} = useAppContext();
	const {push} = useRouter();
	
	if (!user){
		push("/login?returnUrl=books");
	}
	
	useEffect(() => {
		booksService
			.getAll()
			.then(books => {
				setBooks(books);
			})
			.catch(error => {
				// TODO handle errors TODO
				// todo handle unauthorized with redirect FIXME
				console.log(error);
			});
	}, []);

	return (
		<div className='container mt-3'>
			<h1 className='text-center'>Books</h1>
			<ul>
				{books.map(book => (<BooksListItem book={book}/>))}
			</ul>
		</div>
	);
}
