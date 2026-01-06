const Sidebar = () => {
  return (
    <div className="w-[20%] fixed min-h-screen bg-slate-800 p-6 text-white z-10">
      <h2 className="text-2xl font-bold mb-6">Sidebar</h2>
      <ul className="space-y-4">
        <li>
          <a href="#" className="hover:underline">
            Dashboard
          </a>
        </li>

        <li>
          <a href="#" className="hover:underline">
            Department
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Settings
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Profile{" "}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
