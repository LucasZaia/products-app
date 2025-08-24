import { Product } from "../../interfaces/products";
import { createProduct } from "./create";


export async function ProcessCsv(file: File) {
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(l => l.trim() !== "");

    const products: Product[] = []
  
    const headers = lines[0].split(",");
  
    const data = lines.slice(1).map(line => {
      const values = line.split(",");
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => {
        obj[h] = values[i] ?? "";
      });
      return obj;
    });

    data.forEach(async (item) => {

       products.push({
        name: item["Nome"],
        description: item["Descrição"],
        price: Number(item["Preço"]),
        category: item["Categoria"]
       })
    })

    return products;
}