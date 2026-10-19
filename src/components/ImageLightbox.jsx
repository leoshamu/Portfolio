import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

function ImageLightbox({ image, projectTitle, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!image) return undefined

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    dialogRef.current?.showModal()

    return () => {
      document.body.style.overflow = previousOverflow
      if (dialogRef.current?.open) dialogRef.current.close()
    }
  }, [image, onClose])

  if (!image) return null

  return createPortal(
    <dialog
      ref={dialogRef}
      className="image-lightbox"
      aria-label={`${projectTitle} screenshot`}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
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
    </dialog>,
    document.body,
  )
}

export default ImageLightbox
