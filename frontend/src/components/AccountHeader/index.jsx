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
  const [isEditing, setIsEditing] = useState(false);
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);

  /**
   * Gère le clic sur le bouton d'édition.
   */
  const handleEditClick = () => {
    setNewFirstName(firstName);
    setNewLastName(lastName);
    setIsEditing(true);
  };

  /**
   * Gère le clic sur le bouton de sauvegarde.
   */
  const handleSaveClick = async () => {
    try {
      await apiService.updateProfile(newFirstName, newLastName);
      dispatch(setProfile({ firstName: newFirstName, lastName: newLastName }));
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