'use client'

import React from 'react';
import {useAuthorize} from "@/hooks/use-authorize";

interface AuthRequiredComponentProps {
  returnUrl?: string
}

export default function AuthRequired(props: AuthRequiredComponentProps) {
  useAuthorize(props.returnUrl)
  return <></>
}