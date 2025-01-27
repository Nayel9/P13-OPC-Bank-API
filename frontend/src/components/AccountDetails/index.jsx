import { useSelector, useDispatch } from "react-redux";
      import "./AccountDetails.css";
      import { BsArrowReturnLeft } from "react-icons/bs";
      import { resetSelectedAccount } from "../../store";

      /**
       * Composant pour afficher les détails d'un compte.
       * @returns {JSX.Element} Le composant AccountDetails avec les informations du compte et un bouton pour revenir à la liste des comptes.
       */
      const AccountDetails = () => {
        const account = useSelector((state) => state.user.selectedAccount);
        const dispatch = useDispatch();

        /**
         * Gère le retour à la liste des comptes.
         */
        const handleReturnToAccounts = () => {
          dispatch(resetSelectedAccount());
        };

        return (
          <div className="account-details-wrapper">
            <div className="account-details-items">
              <h3 className="account-title">{account.title}</h3>
              <p className="account-amount">{account.amount}</p>
              <p className="account-amount-description">{account.description}</p>
            </div>
            <div className="account-details-wrapper prv">
              <button
                className="prv-button"
                onClick={handleReturnToAccounts}
              >
                <BsArrowReturnLeft />
              </button>
            </div>
          </div>
        );
      };

      export default AccountDetails;