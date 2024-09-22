'use client'

import React from 'react';
import {Book} from "@/types/book";
import styles from '@/components/books/book-content/book-statistic/book-statistic.module.css'
import {useQuery} from "@tanstack/react-query";
import {config} from "@/config/config";
import {getCalculationsService} from "@/services/providers/service-providers";
import LoadingPlaceholder from "@/components/ui/loading/loading-placeholder";

interface BookStatisticProps {
  book: Book;
}

export default function BookStatistic(props: BookStatisticProps) {
  const sumQuery = useQuery({
    queryKey: config.reactQueryKeys.calculations.sum(props.book?.id),
    queryFn: () => getCalculationsService().sum(props.book?.id)
  });

  const balanceQuery = useQuery({
    queryKey: config.reactQueryKeys.calculations.balance(props.book?.id),
    queryFn: () => getCalculationsService().balance(props.book?.id)
  });
  const averageQuery = useQuery({
    queryKey: config.reactQueryKeys.calculations.average(props.book?.id),
    queryFn: () => getCalculationsService().average(props.book?.id)
  });
  const maxQuery = useQuery({
    queryKey: config.reactQueryKeys.calculations.max(props.book?.id),
    queryFn: () => getCalculationsService().maxTransaction(props.book?.id)
  });
  const minQuery = useQuery({
    queryKey: config.reactQueryKeys.calculations.min(props.book?.id),
    queryFn: () => getCalculationsService().minTransaction(props.book?.id)
  });
  const volatilityQuery = useQuery({
    queryKey: config.reactQueryKeys.calculations.volatility(props.book?.id),
    queryFn: () => getCalculationsService().volatility(props.book?.id)
  });

  // todo update statistic when transactions list was changed
  
  return (
    <div className={styles.statContainer}>
      <ul className="list-unstyled m-3 text-truncate">
        <li>
          Sum: 
          {
            sumQuery.isLoading ? <LoadingPlaceholder className="col-4"/> :
              <strong>{sumQuery.data ?? 0}</strong>
          }
        </li>
        <li>
          Balance:
          {
            balanceQuery.isLoading ? <LoadingPlaceholder className="col-4"/> :
              <strong>{balanceQuery.data ?? 0}</strong>
          }
        </li>
        <li>
          Average:
          {
            averageQuery.isLoading ? <LoadingPlaceholder className="col-4"/> :
              <strong>{averageQuery.data ?? 0}</strong>
          }
        </li>
        <li>
          Max:
          {
            maxQuery.isLoading ? <LoadingPlaceholder className="col-4"/> :
              <strong>{maxQuery.data ?? 0}</strong>
          }
        </li>
        <li>
          Min:
          {
            minQuery.isLoading ? <LoadingPlaceholder className="col-4"/> :
              <strong>{minQuery.data ?? 0}</strong>
          }
        </li>
        <li>
          Volatility:
          {
            volatilityQuery.isLoading ? <LoadingPlaceholder className="col-4"/> :
              <strong>{volatilityQuery.data ?? 0}</strong>
          }
        </li>
      </ul>
    </div>
  );
}