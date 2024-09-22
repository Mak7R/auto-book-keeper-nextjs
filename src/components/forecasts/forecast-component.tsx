'use client'

import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {config} from "@/config/config";
import {getCalculationsService, getForecastsService} from "@/services/providers/service-providers";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Line} from "react-chartjs-2";
import LoginComponent from "@/components/auth/login-component/login-component";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ForecastComponentProps {
  bookId: string
}

export default function ForecastComponent(props: ForecastComponentProps) {
  const { data: balanceData, isLoading: balanceLoading, isError: balanceError } = useQuery({
    queryKey: config.reactQueryKeys.calculations.balanceByDate(props.bookId),
    queryFn: () => getCalculationsService().balanceByDate(props.bookId)
  });

  const { data: forecastData, isLoading: forecastLoading, isError: forecastError } = useQuery({
    queryKey: config.reactQueryKeys.forecasts.forecast(props.bookId),
    queryFn: () => getForecastsService().forecast(props.bookId, new Date(new Date().setDate(new Date().getDate() + 7)))
  });

  if (balanceLoading || forecastLoading) {
    return <LoginComponent/>;
  }

  if (balanceError || forecastError) {
    return <div>Error loading data</div>;
  }
  
  if (!balanceData || !forecastData){
    return <LoginComponent/>;
  }
  
  const labels = Object.keys(balanceData).concat(Object.keys(forecastData));
  const balanceValues = Object.values(balanceData);
  const forecastValues = Object.values(forecastData);

  const data = {
    labels,
    datasets: [
      {
        label: 'Balance',
        data: balanceValues,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
      {
        label: 'Forecast',
        data: forecastValues,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Balance and Forecast',
      },
    },
  };

  return (
    <div className="rounded-5 bg-light m-3 p-3">
      <Line data={data} options={options} />
    </div>
  );
}