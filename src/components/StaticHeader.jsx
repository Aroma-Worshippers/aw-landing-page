export default function StaticHeader() {
  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white shadow-md">
        <a href="https://www.aromaworshippers.com">
          <img src="/assets/logo png 1 1.png" alt="Logo" />
        </a>
        <nav className="hidden space-x-6 md:block">
          <a
            className="text-xl  hover:shadow-lg hover:shadow-[#00B425] p-4 rounded-lg"
            href="https://www.aromaworshippers.com"
          >
            Home
          </a>
          <a
            href="https://www.aromaworshippers.com#about"
            className="text-xl   hover:shadow-md hover:shadow-[#00B425] p-4 rounded-lg"
          >
            About
          </a>
          <a
            href="https://www.aromaworshippers.com#events"
            className="text-xl   hover:shadow-md hover:shadow-[#00B425] p-4 rounded-lg"
          >
            Events
          </a>
          <a
            href="https://www.aromaworshippers.com#contact"
            className="text-xl   hover:shadow-md hover:shadow-[#00B425] p-4 rounded-lg"
          >
            Contact
          </a>
        </nav>
      </header>
    </>
  );
}
