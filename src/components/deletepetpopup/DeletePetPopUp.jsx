import "./DeletePetPopUp.css";
import Button from "../button/Button.jsx";

export default function DeletePetPopUp({ isOpen, onClose, onConfirm, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">{children}</div>
                <div className="modal-actions">
                    <Button type="button" color="tertiary" onClick={onClose}>Cancel</Button>
                    <Button type="button" color="tertiary" onClick={onConfirm}>Confirm</Button>
                </div>
            </div>
        </div>
    );
}
