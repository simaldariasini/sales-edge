import type { MenuItemType } from "../types/menu";

export const menuData: MenuItemType[] = [
  {
    title: "Dashboard",
    icon: "/assets/dashboard.svg",
    path: "/",
    children:[
      {title:"Dashboard"}
    ]
  },
  {
    title: "System",
    icon: "/assets/system.svg",
    children: [
      {
        title: "Organization",
        nested: [
          { title: "Organization" },
          { title: "Distribution Channel" },
          { title: "Office" },
          { title: "Department" },
          { title: "Employee" },
          { title: "Vehicles" },
          { title: "Holidays" },
        ],
      },
      {
        title: "Attributes Lists",
        nested: [{ title: "Customer Attributes" }, { title: "Location Attributes" }, {title: "Product Attributes"}],
      },
      { title: "Manage Customers" },
      {
        title: "Manage Product",
        nested: [{ title: "Product" }, { title: "SKU" }],
      },
      { title: "Product Listings" },
      {
        title: "Manage Assets",
        nested: [{ title: "Vehicle Type" }, { title: "Asset " }, {title: "Assets Type"}],
      },
      { title: "Survey List" },
      {
        title: "Operations"
      },
      {
        title: "Users",
      },
      {
        title: "Settings",
        nested: [{ title: "Organization Settings" }, { title: "App Settings" }, {title: "Lockup"}],
      },
    ],
  },
  {
    title: "Sales",
    icon: "/assets/sales.svg",
    path: "/sales",
    children: [
      { title: "Orders", 
        nested:[{title:"Create PreSales Order"},{title:"Sales Order"}, {title:"Unallocated Orders"}]
      },
      {
        title: "Return Orders",
        nested: [{ title: "Van Sales Return Order" }, { title: "Pre Sales Return Order" }],
      },
      {
        title: "Promotions",
        nested: [{title:"VIEW_PROMOTIONS_MENU_ITEM"}, {title:"CREATE_PROMOTIONS_MENU_ITEM"}]
      },
      {
        title:"Task",
        nested: [{title:"Create New Task"}]
      },
      {
        title:"Planogram"
      }
    ],
  },
  {
    title: "Accounts",
    icon: "/assets/account.svg",
    path: "/accounts",
    children: [
      { title: "Collections" },
      {
        title: "Settlements",
      },
      {
        title: "Pending Cheques",
      },
      {
        title: "Finance",
        nested: [{ title: "Banks" }, { title: "Tax Types" }],
      },
      {
        title:"Price Listing"
      }
    ],
  },
  
  {
    title: "Logistics",
    icon: "/assets/logistics.svg",
    path: "/logistics",
    children: [
      { 
        title: "Call Plan",
      },
      { title: "Route" }, {title:"Warehourse"},{title:"View Van Stock"}, {title:"View Load Request"},
      {title:"Salesman Request Approvals"}, {title:"Load Request Template"}
    ],
  },
  {
    title: "Reports",
    icon: "/assets/reports.svg",
    path: "/reports",
    children: [
      { title: "Sales Performance" },{ title: "Market Sales Performance" },{ title: "Daily Sales" },
      { title: "MTD Wastage Exception Summary" },{ title: "Return Order Summary" },{ title: "Brand Wise Sales" },
      { title: "MTD Sales Overview" },{ title: "Monthly Business Review Report" },{ title: "Target Achievement" },
      { title: "Time Management Report" },{ title: " Customer Attendance Report" },{ title: " MTD Attendance Report" },
      { title: "Journey Plan Compliance" },{ title: " Pending Invoice Report" },{ title: "EOT Details" },
      { title: "Route Activity" },{ title: "Revenue Dispersion" },{ title: "Suggested Order Report" },
      { title: "Productivity Coverage" },{ title: " Salesman-wise Journey Report" },{ title: "SKU Dispersion" },
      { title: "Customer Price List" },{ title: "Customer Product Purchase" },{ title: "Customer Activity" },
    ],
  },
];