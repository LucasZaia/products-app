import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import './style.css'

interface SpreadsheetImportProps {
  currentFile?: File | null
  onFileChange?: (file: File) => void
  acceptedFormats?: string[]
  maxFileSize?: number
}

const SpreadsheetImport = ({ 
  currentFile, 
  onFileChange, 
  acceptedFormats = ['.xlsx', '.xls', '.csv'],
  maxFileSize = 10 
}: SpreadsheetImportProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(currentFile || null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (currentFile) {
      setSelectedFile(currentFile)
    }
  }, [currentFile])

  const validateFile = (file: File): boolean => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!acceptedFormats.includes(fileExtension)) {
      alert(`Formato de arquivo não suportado. Formatos aceitos: ${acceptedFormats.join(', ')}`)
      return false
    }

    const fileSizeInMB = file.size / (1024 * 1024)
    if (fileSizeInMB > maxFileSize) {
      alert(`Arquivo muito grande. Tamanho máximo: ${maxFileSize}MB`)
      return false
    }

    return true
  }

  const handleFileUpload = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file)
      onFileChange?.(file)
    }
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'xlsx':
      case 'xls':
        return 'vscode-icons:file-type-excel'
      case 'csv':
        return 'vscode-icons:file-type-csv'
      default:
        return 'material-symbols:table-chart'
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className='spreadsheet-import-container'>
      <input 
        type="file" 
        id="spreadsheet" 
        name="spreadsheet" 
        accept={acceptedFormats.join(',')}
        onChange={handleFileInputChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      
      <div 
        className={`spreadsheet-upload-area ${dragActive ? 'drag-active' : ''}`}
        onClick={handleClick}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {selectedFile !== null ? (
          <div className="file-preview-container">
            <div className="file-info">
              <Icon 
                icon={getFileIcon(selectedFile.name)} 
                width="48" 
                height="48"
                className="file-icon"
              />
              <div className="file-details">
                <p className="file-name">{selectedFile.name}</p>
                <p className="file-size">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            <div className="file-overlay">
              <Icon 
                icon="material-symbols:upload-file" 
                width="32" 
                height="32"
                className="upload-file-icon"
              />
              <p className="overlay-text">Clique para trocar arquivo</p>
            </div>
          </div>
        ) : (
          <div className="upload-placeholder">
            <Icon 
              icon="material-symbols:table-chart" 
              width="64" 
              height="64"
              className="upload-icon"
            />
            <p className="upload-text">
              Clique ou arraste uma planilha
            </p>
            <p className="upload-subtext">
              Formatos aceitos: {acceptedFormats.join(', ')}
            </p>
            <p className="upload-subtext">
              Tamanho máximo: {maxFileSize}MB
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SpreadsheetImport
