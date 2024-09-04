import React from 'react';
import Link from 'next/link';

interface NavLinkItemProps {
  href: string;
  children?: React.ReactNode;
}

export default function NavLinkItem(props: NavLinkItemProps) {  
  return (
    <li className="nav-item" >
      <Link href={props.href} className="nav-link">
        <div data-bs-dismiss="offcanvas">{props.children}</div>
      </Link>
    </li>
  );
}