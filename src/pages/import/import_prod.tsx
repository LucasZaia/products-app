import React, { useState } from 'react'
import SpreadsheetImport from '../../components/ui/spreadsheetImport/spreadsheetImport'
import ButtonAction from '../../components/ui/button/buttonAction'
import './style.css'
import { Form } from 'react-router'
import ImportList from '../../components/import_list/import_list'
import { Product } from '../../interfaces/products'
import { ProcessCsv } from '../../data/Products/process_csv'

const ImportProd = () => {
  const [file, setFile] = useState<File | null>(null)
  const handleFileChange = (file: File) => {
    setFile(file)
  }

  const [products, setProducts] = useState<Product[]>([])

  const handleImport = async () => {
    if (file) {
      const products = await ProcessCsv(file)
      setProducts(products)
    }
    else {
      alert('Por favor, selecione um arquivo')
    }
  }


  return (
    <div className="import-prod-container">
      <div className="import-prod-header">
        <h1>Importar Produtos</h1>
        <p>Importe um arquivo CSV com os produtos</p>
      </div>

      <div className="import-prod-form">
        <SpreadsheetImport
          currentFile={file}
          acceptedFormats={['.csv']}
          maxFileSize={10}
          onFileChange={handleFileChange}
        />
        <ButtonAction
          type="primary"
          format="medium"
          border="rounded"
          text="Carregar Arquivo"
          onClick={handleImport}
        />
      </div>


      {products.length > 0 && (
        <ImportList products={products} />
      )}
    </div>
  )
}

export default ImportProd