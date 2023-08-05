import React, { useState } from "react";
import Modal from "./Modal";

const ImageGalleryItem = ({ searchItem }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <li key={searchItem.id} className="ImageGalleryItem">
            <img src={searchItem.webformatURL} alt="" className="ImageGalleryItem-image" onClick={openModal}/>
            {isModalOpen && <Modal imageURL={searchItem.largeImageURL} onClose={closeModal} />}
        </li>
    )
}

export default ImageGalleryItem;