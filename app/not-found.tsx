import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-full mt-20">
      <div className="text-center">
        <p className="text-base font-semibold text-theme">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="text-white bg-theme hover:bg-blue-700 font-medium rounded-sm text-sm px-5 py-2.5 text-center"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
