import { Outlet, NavLink } from "react-router";
import { Map, List, Settings } from "lucide-react";

export function Layout() {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-gray-50 text-gray-900">
      {/* Top Header */}
      <header className="bg-white shadow-sm z-10 px-4 py-3 pt-[calc(0.75rem+env(safe-area-inset-top))] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
            A
          </div>
          <h1 className="font-bold text-lg text-gray-800 tracking-tight">AutoBusca</h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 shrink-0 pb-[env(safe-area-inset-bottom)] z-20">
        <div className="flex justify-around items-center h-16">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
              }`
            }
          >
            <Map className="w-6 h-6" />
            <span className="text-[10px] font-medium uppercase tracking-wider">Mapa</span>
          </NavLink>
          
          <NavLink
            to="/lista"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
              }`
            }
          >
            <List className="w-6 h-6" />
            <span className="text-[10px] font-medium uppercase tracking-wider">Lista</span>
          </NavLink>

          <NavLink
            to="/opcoes"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
              }`
            }
          >
            <Settings className="w-6 h-6" />
            <span className="text-[10px] font-medium uppercase tracking-wider">Opções</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
