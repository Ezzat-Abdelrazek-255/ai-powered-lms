import { cn } from "@/utils";

export function LogoWhiteSvg({ className }: { className?: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M23.7071 13.4644C23.0772 14.0944 22 13.6482 22 12.7573V0H18V15C18 16.6568 16.6569 18 15 18H0V22H12.7573C13.6483 22 14.0944 23.0771 13.4645 23.7071L4.58577 32.5858L7.41423 35.4142L16.2929 26.5355C16.921 25.9075 17.9936 26.349 18 27.2348V40H22L22 25C22 23.3431 23.3431 22 25 22H40V18H27.2348C26.3518 17.9936 25.91 16.9273 26.53 16.2985L26.5355 16.2929L35.4142 7.4142L32.5858 4.5858L23.7071 13.4644Z"
        fill="#F1F1F1"
      />
    </svg>
  );
}

export function EnterSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 13"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 8e-08L1.01328e-06 9H8.29289L5.96447 11.3284C5.7692 11.5237 5.7692 11.8403 5.96447 12.0355C6.15973 12.2308 6.47631 12.2308 6.67157 12.0355L9.8536 8.85355C10.0488 8.65829 10.0488 8.34171 9.8536 8.14645L6.67157 4.96447C6.47631 4.7692 6.15973 4.7692 5.96447 4.96447C5.7692 5.15973 5.7692 5.47631 5.96447 5.67157L8.29289 8H1V0L0 8e-08Z"
      />
    </svg>
  );
}

export function BackgroundSvg({ className }: { className?: string }) {
  return (
    <svg
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1378 1380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M0 691.532H132.479C230.046 691.532 305.097 616.482 305.097 518.915V113.639C305.097 70.2738 319.924 31.3564 344.964 1.5"></path>{" "}
      <path d="M305.094 1379.5V863.214C305.094 765.647 380.145 690.596 477.711 690.596H897.997C995.564 690.596 1070.61 615.545 1070.61 517.979V112.703C1070.61 69.6162 1085.25 30.9206 1110 1.14062"></path>{" "}
      <path d="M1378 691.532L1243.23 691.532C1145.67 691.532 1070.62 766.583 1070.62 864.15V1379.5"></path>{" "}
    </svg>
  );
}

export function BackgroundPulseSvg({ className }: { className?: string }) {
  return (
    <svg
      className={cn("plus-stroke plus-stroke2 pa", className)}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1378 1380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="dropshadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow
          dx="0"
          dy="0"
          stdDeviation="5"
          floodColor="white"
          floodOpacity="1"
        ></feDropShadow>
      </filter>
      <path
        filter="url(#dropshadow)"
        className="p1"
        d="M0 691.532H132.479C230.046 691.532 305.097 616.482 305.097 518.915V113.639C305.097 70.2738 319.924 31.3564 344.964 1.5"
      ></path>
      <path
        filter="url(#dropshadow)"
        className="p2"
        d="M305.094 1379.5V863.214C305.094 765.647 380.145 690.596 477.711 690.596H897.997C995.564 690.596 1070.61 615.545 1070.61 517.979V112.703C1070.61 69.6162 1085.25 30.9206 1110 1.14062"
      ></path>
      <path
        filter="url(#dropshadow)"
        className="p3"
        d="M1378 691.532L1243.23 691.532C1145.67 691.532 1070.62 766.583 1070.62 864.15V1379.5"
      ></path>
    </svg>
  );
}

export function PlusSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.482 5.48201H6.51799V0.517986C6.51799 0.231885 6.2861 0 6 0C5.7139 0 5.48201 0.231885 5.48201 0.517986V5.48201H0.517986C0.231885 5.48201 0 5.7139 0 6C0 6.2861 0.231885 6.51799 0.517986 6.51799H5.48201V11.482C5.48201 11.7681 5.7139 12 6 12C6.2861 12 6.51799 11.7681 6.51799 11.482V6.51799H11.482C11.7681 6.51799 12 6.2861 12 6C12 5.7139 11.7681 5.48201 11.482 5.48201Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function AbstractSvg({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0L14.529 4.21655L19.0534 2.2918L18.621 7.18957L23.4127 8.2918L20.184 12L23.4127 15.7082L18.621 16.8104L19.0534 21.7082L14.529 19.7834L12 24L9.471 19.7834L4.94658 21.7082L5.379 16.8104L0.587322 15.7082L3.816 12L0.587322 8.2918L5.379 7.18957L4.94658 2.2918L9.471 4.21655L12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function AbstractSvg2({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.0006 10.1953H16.342L21.7566 4.78281L19.2132 2.24149L13.7987 7.65198V-0.000488281H10.2025V7.65198L4.78595 2.24149L2.24259 4.78281L7.65919 10.1953H0.000610352V13.7894H7.65919L2.24259 19.1999L4.78595 21.7412L10.2025 16.3308V23.9832H13.7987V16.3308L19.2132 21.7412L21.7566 19.1999L16.342 13.7894H24.0006V10.1953Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function AbstractSvg3({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.7629 12.4404L0 0.441406H12.235L24 12.4404H11.7629Z"
        fill="currentColor"
      />
      <path
        d="M11.7629 24.4394L0 12.4404H12.235L24 24.4394H11.7629Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function AbstractSvg4({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12.5391" r="12" fill="currentColor" />
    </svg>
  );
}

export function AbstractSvg5({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.512 11.9993C30.6251 22.286 22.2867 30.6244 12 16.5114C1.7133 30.6244 -6.62508 22.286 7.48796 11.9993C-6.62508 1.71396 1.7133 -6.62575 12 7.48862C22.2867 -6.62575 30.6251 1.71396 16.512 11.9993Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function AbstractSvg6({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0L14.529 4.21655L19.0534 2.2918L18.621 7.18957L23.4127 8.2918L20.184 12L23.4127 15.7082L18.621 16.8104L19.0534 21.7082L14.529 19.7834L12 24L9.471 19.7834L4.94658 21.7082L5.379 16.8104L0.587322 15.7082L3.816 12L0.587322 8.2918L5.379 7.18957L4.94658 2.2918L9.471 4.21655L12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
