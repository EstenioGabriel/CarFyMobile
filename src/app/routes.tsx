import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { MapView } from "./components/MapView";
import { ListView } from "./components/ListView";
import { OptionsView } from "./components/OptionsView";
import { ProviderRegistration } from "./components/ProviderRegistration";
import { AdminPanel } from "./components/AdminPanel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: MapView },
      { path: "lista", Component: ListView },
      { path: "opcoes", Component: OptionsView },
    ],
  },
  {
    path: "/cadastro-prestador",
    Component: ProviderRegistration,
  },
  {
    path: "/admin",
    Component: AdminPanel,
  }
]);
