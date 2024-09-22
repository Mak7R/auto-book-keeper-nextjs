import React from 'react';
import ForecastComponent from "@/components/forecasts/forecast-component";
import {config} from "@/config/config";
import AuthRequired from "@/components/helpers/auth-required/auth-required";

interface ForecastsPageProps {
  params: {
    bookId: string;
  }
}

export default function ForecastsPage(props: ForecastsPageProps) {
  return (
    <>
      <AuthRequired returnUrl={config.localUrls.forecasts.index(props.params.bookId)}/>
      <div className='container-xxl mt-3'>
        <ForecastComponent bookId={props.params.bookId}/>
      </div>
    </>
  );
}