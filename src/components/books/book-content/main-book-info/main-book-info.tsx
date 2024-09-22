'use client'

import styles from "./main-book-info.module.css"
import {getBooksService} from "@/services/providers/service-providers";
import BookActions from "@/components/books/book-content/book-actions/book-actions";
import Loading from "@/components/ui/loading/loading";
import UsernameRef from "@/components/users/username-ref/username-ref";
import {useQuery} from "@tanstack/react-query";
import {config} from "@/config/config";
import {formatLocalDate} from "@/libs/datatime/datatime";
import React from "react";
import BookStatistic from "@/components/books/book-content/book-statistic/book-statistic";

interface MainBookInfoProps {
  bookId: string
}

export default function MainBookInfo(props: MainBookInfoProps) {
  const {data, isLoading} = useQuery({
    queryKey: config.reactQueryKeys.books.byId(props.bookId),
    queryFn: () => getBooksService().getById(props.bookId)
  });
  
  return (
    <>
      <div className={styles.mainInfoContainer}>
        <div>
          {isLoading ? <Loading />
            :
            data && <>
              <h3 className={styles.bookTitle}>{data.title}</h3>
              <p className={styles.bookId}>{data.id}</p>
              <p>Description: <br/>{data.description}</p>
              <p>{formatLocalDate(data.creationTime)}</p>
              <p><UsernameRef userId={data.ownerId} /></p>
            </>            
          }
        </div>
      </div>
      <BookActions book={data} />
      { data && <BookStatistic book={data} />}
    </>
  )
}