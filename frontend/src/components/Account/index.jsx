import "./Account.css";
                  import { useEffect, useState } from "react";
                  import apiService from "../../services/apiService";
                  import { useSelector, useDispatch } from "react-redux";
                  import { setSelectedAccount } from "../../store";
                  import AccountDetails from "../AccountDetails";
                  import AccountHeader from "../AccountHeader/index.jsx";
                  import TransactionsTable from "../TransactionsTable/index.jsx";
                  import Loader from "../Loader";

                  const Account = () => {
                    const [accounts, setAccounts] = useState([]);
                    const [loading, setLoading] = useState(true);
                    const [error, setError] = useState("");
                    const userId = useSelector((state) => state.user.id);
                    const selectedAccount = useSelector((state) => state.user.selectedAccount);
                    const dispatch = useDispatch();

                    useEffect(() => {
                      const fetchAccounts = async () => {
                        if (userId) {
                          setLoading(true);
                          console.log("Fetching accounts for userId:", userId);
                          try {
                            const data = await apiService.getAccounts(userId, setLoading);
                            console.log("Accounts data:", data);
                            setAccounts(data);
                          } catch (error) {
                            console.error("Failed to fetch accounts:", error);
                            setError(`Failed to fetch accounts: ${error.message}`);
                          } finally {
                            setLoading(false);
                            console.log("Loading state set to false");
                          }
                        } else {
                          console.warn("No userId found, skipping fetchAccounts");
                        }
                      };
                      fetchAccounts();
                    }, [userId]);

                    const handleViewTransactions = (account) => {
                      console.log("Viewing transactions for account:", account);
                      dispatch(setSelectedAccount(account));
                    };

                    if (loading) {
                      console.log("Loading...");
                      return <Loader />;
                    }

                    if (error) {
                      return <div className="error-message">{error}</div>;
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
                                  <p className="account-amount-description">{account.description}</p>
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