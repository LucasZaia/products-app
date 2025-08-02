import { createBrowserRouter, redirect } from "react-router";
import ProdList from "../pages/prod_list";
import Main from "../layouts/main";
import AddProd from "../pages/add_prod/add_prod";
import { prodList } from "../consts/prodlist";

import { getCategories } from "../data/Products/category";
import { getProducts } from "../data/Products/list";

export const router = createBrowserRouter([
  {
    path: "/",  
    Component: Main,
    children: [
      {
        index: true,
        loader: () => redirect('/produtos'),
      },
      {
        path: "/produtos",
        loader: () => getProducts(),
        Component: ProdList,
      },
      {
        path: "/cadastro-produto",
        loader: async () => {
          const categories = await getCategories();
          return { categories };
        },
        Component: AddProd,
      },
    ],
  },
]);
