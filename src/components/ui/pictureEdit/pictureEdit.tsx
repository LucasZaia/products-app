import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import './style.css'
import defaultImage from '../../../assets/img/default.png'

interface PictureEditProps {
  currentImage?: string | null
  onImageChange?: (image: string) => void
}

const PictureEdit = ({ currentImage, onImageChange }: PictureEditProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(currentImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (currentImage) {
      setSelectedImage(currentImage)
    }
  }, [currentImage])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target?.result as string
        setSelectedImage(imageData)
        onImageChange?.(imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className='picture-edit-container'>
      <input 
        type="file" 
        id="image" 
        name="image" 
        accept="image/*"
        onChange={handleImageUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      
      <div 
        className="image-upload-area"
        onClick={handleClick}
      >
        {selectedImage !== null ? (
          <div className="image-preview-container">
            <img 
              src={selectedImage} 
              onError={(e) => {
                e.currentTarget.src = defaultImage;
              }}
              alt="Imagem carregada"
              className="image-preview"
            />
            <div className="image-overlay">
              <Icon 
                icon="mdi:camera" 
                width="32" 
                height="32"
                className="camera-icon"
              />
            </div>
          </div>
        ) : (
          <div className="upload-placeholder">
            <Icon 
              icon="material-symbols:upload" 
              width="48" 
              height="48"
              className="upload-icon"
            />
            <p className="upload-text">
              Clique para carregar uma imagem
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PictureEdit