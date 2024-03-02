import HomePage from "@/pages/Home.tsx";
import LoginPage from "@/pages/Login.tsx";
import { IconHome, IconInfoCircle } from "@tabler/icons-react";
import AboutPage from "@/pages/About.tsx";

export const routes = [
  {
    path: "/",
    page: HomePage,
  },
  {
    path: "/login",
    page: LoginPage,
  },
  {
    path: "/about",
    page: AboutPage,
  },
];

export const navs = [
  {
    label: "首页",
    icon: IconHome,
    path: "/",
  },
  {
    label: "关于",
    icon: IconInfoCircle,
    path: "/about",
  },
];
