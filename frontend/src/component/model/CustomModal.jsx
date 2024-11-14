import React from "react";
import PropTypes from "prop-types";

const CustomModal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null; // Don't render anything if modal is closed

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-5">
            <div className="flex justify-end items-end">
                    <button className="text-gray-600" onClick={onClose}>✕</button>
                </div>
                <div className="flex justify-center items-center mb-4">
                    <h2 className="text-lg font-semibold text-center">{title}</h2>
                </div>
              
                <div>{children}</div>
            </div>
        </div>
    );
};

CustomModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default CustomModal;
