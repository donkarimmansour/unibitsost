import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Product",
      href: "/product",
    },
    {
      title: "Statistics",
      href: "/statistics",
    }
  ],
  sidebarNav: [
    {
      title: "Products",
      href: "/dashboard",
      icon: "product",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
 