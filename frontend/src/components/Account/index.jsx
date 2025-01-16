import "./Account.css";
import { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedAccount } from "../../store";
import AccountDetails from "../AccountDetails";
import AccountHeader from "../AccountHeader/index.jsx";

const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const userId = useSelector((state) => state.user.id);
  const selectedAccount = useSelector((state) => state.user.selectedAccount);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAccounts = async () => {
      if (userId) {
        const data = await apiService.getAccounts(userId);
        setAccounts(data);
      }
    };
    fetchAccounts();
  }, [userId]);

  const handleViewTransactions = (account) => {
    dispatch(setSelectedAccount(account));
  };

  return (
    <section className="account-wrapper">
      {!selectedAccount && <AccountHeader />}
      {selectedAccount ? (
        <div className="account-details">
          <AccountDetails />
        </div>
      ) : (
        <div className="account">
          {accounts.map((account) => (
            <div key={account.id} className="account-content-wrapper">
              <div className="account-content-items">
                <h3 className="account-title">{account.title}</h3>
                <p className="account-amount">{account.amount}</p>
                <p className="account-amount-description">
                  {account.description}
                </p>
              </div>
              <div className="account-content-wrapper cta">
                <button
                  className="transaction-button"
                  onClick={() => handleViewTransactions(account)}
                >
                  View transactions
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
export default Account;
