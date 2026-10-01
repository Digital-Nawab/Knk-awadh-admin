"use client";

import React from 'react'
import GallerySection from './GallerySection'

function Gallery({ initialImages = [] }) {
  return (
    <>
      <GallerySection initialImages={initialImages} />
    </>
  )
}

export default Gallery