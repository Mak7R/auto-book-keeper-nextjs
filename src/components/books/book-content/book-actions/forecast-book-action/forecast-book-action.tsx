import React from 'react';
import {Book} from "@/types/book";
import {config} from "@/config/config";

interface ForecastBookActionProps {
  book: Book
}

export default function ForecastBookAction(props: ForecastBookActionProps) {
  return (
    <>
      <a
        className="w-100 btn rounded-5 btn-success" href={config.localUrls.forecasts.index(props.book.id)}>
        Forecasts
      </a>
    </>
  );
}