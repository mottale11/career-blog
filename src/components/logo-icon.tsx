export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={className}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="24" y1="6" x2="24" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34A8EB" />
          <stop offset="1" stopColor="#2878C8" />
        </linearGradient>
      </defs>
      <path
        fill="url(#logo-gradient)"
        d="M24 42C14.0589 28.2433 12 26.1214 12 18C12 11.3726 17.3726 6 24 6C30.6274 6 36 11.3726 36 18C36 26.1214 29.9411 28.2433 24 42Z"
      />
      <g transform="translate(0, -2)" fill="none" stroke="black" strokeWidth="2">
        <rect x="18" y="19" width="12" height="8" rx="1" />
        <path d="M21 19V17C21 16.4477 21.4477 16 22 16H26C26.5523 16 27 16.4477 27 17V19" />
        <rect x="23" y="22" width="2" height="2" fill="white" stroke="none"/>
      </g>
    </svg>
  );
}
