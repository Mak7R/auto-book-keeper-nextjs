import React from 'react';

interface LoadingPlaceHolderProps {
  className?: string;
}

export default function LoadingPlaceholder(props: LoadingPlaceHolderProps) {
  return (
    <>
      <span className={props.className + " placeholder"}></span>
    </>
  );
}