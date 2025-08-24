import { createBrowserRouter, redirect } from "react-router";
import ProdList from "../pages/prod_list";
import Main from "../layouts/main";
import AddProd from "../pages/add_prod/add_prod";
import { uploadImage } from "../data/Products/upload_image";

import { getCategories } from "../data/Products/category";
import { getProducts } from "../data/Products/list";
import { createProduct } from "../data/Products/create";
import { Product } from "../interfaces/products";
import { getProduct } from "../data/Products/getProduct";
import EditProd from "../pages/edit_prod/edit";
import { updateProduct } from "../data/Products/update";
import ImportProd from "../pages/import/import_prod";
import { ProcessCsv } from "../data/Products/process_csv";


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
        action: async ({ request }) => {
          try {
            console.log('action');
            const formData = await request.formData();

            const product: Product = {
              name: formData.get('name') as string,
              description: formData.get('description') as string,
              price: Number(formData.get('price')),
              category: formData.get('category') as string,
              pictureUrl: null
            }
            
            const id = await createProduct(product);
            
            if (id) {
             
              await uploadImage(formData.get('image') as File, id);
              
            }
            
            return redirect('/produtos');
          } catch (error) {
            console.error('Erro na action:', error);
            throw error;
          }
        },
        Component: AddProd,
      },

      {
        path: "/editar-produto/:id",
        loader: async ({params}) => {
          const product = await getProduct(Number(params.id));
          return { product };
        },
        action: async ({request, params}) => {
          const formData = await request.formData();
          const product: Product = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            price: Number(formData.get('price')),
            category: formData.get('category') as string,
          }
          await updateProduct(Number(params.id), product);

          if (formData.get('image')) {
            await uploadImage(formData.get('image') as File, Number(params.id));
          }

          return redirect('/produtos');
        },
        Component: EditProd,
      },

      {
        path: "/importar-produtos",
        Component: ImportProd,
      },
    ],
  },
]);
