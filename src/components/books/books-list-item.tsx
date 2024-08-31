

function formatLocalDate(dateString: string): string {
  const utcDate = new Date(dateString);
  const day = utcDate.getDate();
  const month = utcDate.getMonth() + 1;
  const year = utcDate.getFullYear();
  const hours = utcDate.getHours();
  const minutes = utcDate.getMinutes();
  const seconds = utcDate.getSeconds();

  return `${day.toString().padStart(2, '0')}/${month
    .toString()
    .padStart(2, '0')}/${year} ${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default function BooksListItem({ book }: {book: Book}) {
  return (
    <>
      <li>
        {book.id}: {book.title}: {book.description}:{' '}{formatLocalDate(book.creationTime)}: {book.ownerId}
      </li>
    </>
  );
}