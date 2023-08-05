import React from "react";
import ImageGalleryItem from "./ImageGalleryItem";

const ImageGallery = ({ searchArr }) => {
    return (
        <ul className="ImageGallery">
            {
                searchArr.map(searchItem => {
                    return <ImageGalleryItem searchItem={searchItem} />
                })
            }
        </ul>
    )
};

export default ImageGallery;