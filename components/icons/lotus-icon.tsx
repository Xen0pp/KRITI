import type { SVGProps } from 'react';

export function LotusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8.5 20c2.5 0 4.5-2 4.5-4.5S11 11 8.5 11 4 13 4 15.5 6 20 8.5 20z" />
      <path d="M15.5 20c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z" />
      <path d="M12 11.5V14" />
      <path d="M12 4c-3.5 0-6 3-6 6.5 0 2 1 3.5 3 4.5" />
      <path d="M12 4c3.5 0 6 3 6 6.5 0 2-1 3.5-3 4.5" />
    </svg>
  );
}
