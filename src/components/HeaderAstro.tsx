export default function HeaderApp() {
  return (
    <div className="min-h-16 flex flex-row justify-between px-5 items-center border-b-2 border-b-red-600">
      <div className="ml-5 text-5xl text-transparent tracking-wide bg-clip-text bg-gradient-to-r from-blue-900 to-black">FLIGHT DASHBOARD</div>
      <div className="min-w-20 py-2 bg-fuchsia-600 text-center rounded">
        <a href="/api/auth/signout" className="px-2 text-base text-white" rel="noopener noreferrer">
          logout
        </a>
      </div>
    </div>
  );
}
