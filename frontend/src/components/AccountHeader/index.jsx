import "./AccountHeader.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setProfile } from "../../store";
import apiService from "../../services/apiService";

/**
 * Composant pour afficher et éditer le nom de l'utilisateur dans l'en-tête du compte.
 * @returns {JSX.Element} Le composant AccountHeader avec le nom de l'utilisateur et les options d'édition.
 */
const AccountHeader = () => {
  const dispatch = useDispatch();
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const userId = useSelector((state) => state.user.id);
  const [isEditing, setIsEditing] = useState(false);
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [error, setError] = useState("");

  /**
   * Gère le clic sur le bouton d'édition.
   */
  const handleEditClick = () => {
    setNewFirstName(firstName);
    setNewLastName(lastName);
    setIsEditing(true);
  };

  /**
   * Valide les champs de saisie.
   * @param {string} firstName - Le prénom à valider.
   * @param {string} lastName - Le nom de famille à valider.
   * @returns {boolean} True si les champs sont valides, sinon False.
   */
  const validateFields = (firstName, lastName) => {
    const nameRegex = /^[A-Za-z]+$/;
    if (!firstName || !lastName) {
      setError("Fields cannot be empty.");
      return false;
    }
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      setError("Fields can only contain letters.");
      return false;
    }
    setError("");
    return true;
  };

  /**
   * Gère le clic sur le bouton de sauvegarde.
   */
  const handleSaveClick = async () => {
    if (!validateFields(newFirstName, newLastName)) {
      return;
    }
    try {
      await apiService.updateProfile(newFirstName, newLastName);
      dispatch(setProfile({ id: userId, firstName: newFirstName, lastName: newLastName }));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };
  /**
   * Gère le clic sur le bouton d'annulation.
   */
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="header">
      {isEditing ? (
        <div className="edit-header">
          <h1>Welcome back</h1>
          <div className="edit-name">
            <input
              type="text"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
            />
            <input
              type="text"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="edit-buttons">
            <button className="save-button" onClick={handleSaveClick}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>
            Welcome back
            <br />
            {firstName} {lastName} !
          </h1>
          <button className="edit-button" onClick={handleEditClick}>
            Edit Name
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountHeader;
