import {ContentPasteSearch, Dashboard, Discount, Group, PostAdd, ViewList} from "@mui/icons-material";
export const pagesSidebar = [
  {
    path: "/",
    title: "Home",
    icon: (
      <Dashboard />
    ),
  },
  {
    path: "/tariffs",
    title: "Tarifários",
    icon: ( <ViewList /> ),
  },
  {
    path: "/budgets",
    title: "Orçamentos",
    icon: (<ContentPasteSearch />),
  },
  {
    path: "/users",
    title: "Usuários",
    icon: (<Group />),
  },
  {
    path: "/requirements",
    title: "Requerimentos",
    icon: (<PostAdd />),
  },
  {
    path: "/discounts",
    title: "Descontos",
    icon: (<Discount />),
  },
];
