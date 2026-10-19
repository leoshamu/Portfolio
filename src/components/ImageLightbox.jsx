import { useEffect } from 'react'

function ImageLightbox({ image, projectTitle, onClose }) {
  useEffect(() => {
    if (!image) return undefined

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [image, onClose])

  if (!image) return null

  return (
    <div
      className="image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${projectTitle} screenshot`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <button
        className="image-lightbox-close"
        type="button"
        aria-label="Close image"
        onClick={onClose}
        autoFocus
      >
        &times;
      </button>
      <img src={image.src} alt={image.alt} />
    </div>
  )
}

export default ImageLightbox
