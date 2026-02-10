import { DashboardSidebarMenuGroupInterface, DashboardSidebarMenuInterface } from "@/lib/types";


export const adminDashboardSidebarOptions: DashboardSidebarMenuGroupInterface[] = [
  {
    label: "Dashboard",
    isActive: true,
    icon: "DashboardIcon",
    link: "dashboard"
  },
 
  {
    label: "Stores",
    icon: "StoreIcon",
    isActive:false,
    link: "/dashboard/admin/stores",
  },
  {
    label: "Orders",
    icon: "BoxListIcon",
    isActive:false,
    link: "/dashboard/admin/orders",
  },
  {
    label: "Categories",
    icon: "CategoriesIcon",
    isActive:false,
    link: "/dashboard/admin/categories",
  },
  {
    label: "Sub-Categories",
    icon: "CategoriesIcon",
    isActive:false,
    link: "/dashboard/admin/subCategories",
  },
  {
    label: "Offer Tags",
    icon: "OfferIcon",
    isActive:false,
    link: "/dashboard/admin/offer-tags",
  },
  {
    label: "Coupons",
    icon: "CouponIcon",
    isActive:false,
    link: "/dashboard/admin/coupons",
  },
];

export const SellerDashboardSidebarOptions: DashboardSidebarMenuGroupInterface[] = [
  {
    label: "Dashboard",
    isActive: true,
    icon: "DashboardIcon",
    link: "dashboard"
  },
  {
    label: "Products Management",
    isActive: false,
    icon: "ProductsIcon",
    items: [
      {
        label: "Products",
        icon: "ProductsIcon",
        link: "products",
      },
      {
        label: "Inventory",
        icon: "InventoryIcon",
        link: "inventory",
      },
    ]
  },
  {
    label: "Sales Management",
    isActive: false,
    icon: "ShippingIcon",
    items: [
      {
        label: "Orders",
        icon: "BoxListIcon",
        link: "orders",
      },
      {
        label: "Shipping",
        icon: "ShippingIcon",
        link: "shipping",
      },
    ]
  },

  {
    label: "Discounts",
    isActive: false,
    icon: "CouponIcon",
    items: [
      {
        label: "Coupons",
        icon: "CouponIcon",
        link: "coupons",
      },
    ]
  },
  {
    label: "Settings",
    isActive: false,
    icon: "SettingsIcon",
    link: "settings"
  },
];
