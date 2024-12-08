export default function Sidebar() {
  const menuItems = [
    { href: "/departure", label: "Departure Dashboard" },
    { href: "/arrival", label: "Arrival Dashboard" },
    { href: "/wisata", label: "8 Wisata di Nias" },
  ];

  return (
    <div className="sm:hidden md:inline w-1/6 bg-blue-700 h-screen text-white text-2xl tracking-wide">
      <div className="ml-5 mt-3 text-yellow-300">Side Bar</div>
      {menuItems.map((item) => (
        <div key={item.href} className="ml-5 mt-3 hover:bg-fuchsia-600">
          <a href={item.href} target="_blank">
            {item.label}
          </a>
        </div>
      ))}
    </div>
  );
}
