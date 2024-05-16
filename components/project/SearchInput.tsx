export default function SearchInput() {
  return (
    <div className="flex items-center bg-gray-100 rounded-sm px-3 py-1 max-w-md">
      <SearchIcon className="h-3 w-3 text-gray-500 mr-2" />
      <input
        className="bg-transparent flex-1 text-gray-700 focus:outline-none text-sm"
        placeholder="Search"
        type="text"
      />
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
