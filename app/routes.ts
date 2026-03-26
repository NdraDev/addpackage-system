import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("packages", "routes/packages.tsx"),
  route("ip-server-terdaftar", "routes/ip-server-terdaftar.tsx"),
  route("artikel", "routes/artikel.tsx"),
  route("documentation", "routes/documentation.tsx"),
  route("tools-whm-cpanel", "routes/tools-whm-cpanel.tsx"),
  route("tools-auto-addpackage-whm-cpanel", "routes/tools-auto-addpackage.tsx"),
  route("tools-ai-whm", "routes/tools-ai-whm.tsx"),
] satisfies RouteConfig;
