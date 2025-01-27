import "./Account.css";
          import { useEffect, useState } from "react";
          import apiService from "../../services/apiService";
          import { useSelector, useDispatch } from "react-redux";
          import { setSelectedAccount } from "../../store";
          import AccountDetails from "../AccountDetails";
          import AccountHeader from "../AccountHeader/index.jsx";
          import TransactionsTable from "../TransactionsTable/index.jsx";
          import Loader from "../Loader";

          /**
           * Composant pour afficher les comptes et les transactions de l'utilisateur.
           * @returns {JSX.Element} Le composant Account avec les détails des comptes et des transactions.
           */
          const Account = () => {
            const [accounts, setAccounts] = useState([]);
            const [loading, setLoading] = useState(true);
            const userId = useSelector((state) => state.user.id);
            const selectedAccount = useSelector((state) => state.user.selectedAccount);
            const dispatch = useDispatch();

            useEffect(() => {
              const fetchAccounts = async () => {
                if (userId) {
                  setLoading(true);
                  const data = await apiService.getAccounts(userId, setLoading);
                  setAccounts(data);
                  setLoading(false);
                }
              };
              fetchAccounts();
            }, [userId]);

            const handleViewTransactions = (account) => {
              dispatch(setSelectedAccount(account));
            };

            if (loading) {
              return <Loader />;
            }

            return (
              <section className="account-wrapper">
                {!selectedAccount && <AccountHeader />}
                {selectedAccount ? (
                  <div className="account">
                    <AccountDetails />
                    <TransactionsTable account={selectedAccount} />
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
                        <div className="cta">
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