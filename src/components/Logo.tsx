export default function Logo({ className }: { className?: string }) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="200"
        height="200"
        className={className}
      >
        {/* Book body */}
        <path
          fill="#5C6BC0"
          d="M96 96v320c0 26.51 21.49 48 48 48h272c26.51 0 48-21.49 48-48V96H96z"
        />

        {/* Pages */}
        <path
          fill="#FFEB3B"
          d="M144 96v320c0 8.837 7.163 16 16 16h272c8.837 0 16-7.163 16-16V96H144z"
        />

        {/* Binding */}
        <path
          fill="#3F51B5"
          d="M96 64v32c0 8.837 7.163 16 16 16h320V80c0-26.51-21.49-48-48-48H112c-26.51 0-48 21.49-48 48v16H96c-8.837 0-16 7.163-16 16z"
        />

        {/* Decorative lines */}
        <path
          fill="#E0E0E0"
          d="M144 104h224v16H144zM144 160h224v16H144zM144 216h224v16H144zM144 272h224v16H144zM144 328h224v16H144z"
        />
      </svg>
    </>
  );
}
