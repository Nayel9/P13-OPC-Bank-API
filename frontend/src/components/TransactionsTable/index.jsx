import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setExpandedTransaction } from "../../store.jsx";
import apiService from "../../services/apiService.jsx";
import { FaChevronDown } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Loader from "../Loader";
import "./TransactionsTable.css";

const TransactionsTable = () => {
  const [categoryOptions] = useState([
    "Income",
    "Hobbies",
    "Charity",
    "Community",
  ]);
  const [editingField, setEditingField] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const expandedTransaction = useSelector(
    (state) => state.user.expandedTransaction || null,
  );
  const userId = useSelector((state) => state.user.id);
  const selectedAccount = useSelector((state) => state.user.selectedAccount);

  useEffect(() => {
    async function fetchTransactions() {
      if (selectedAccount && userId) {
        setLoading(true);
        const transactions = await apiService.getTransactions(
          userId,
          selectedAccount.id,
          setLoading
        );
        const sortedTransactions = [...transactions].sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );
        setTransactions(sortedTransactions);
        setLoading(false);
      }
    }

    fetchTransactions();
  }, [selectedAccount, userId]);

  useEffect(() => {
    return () => {
      dispatch(setExpandedTransaction(null));
    };
  }, [dispatch]);

  const handleRowClick = (transactionId) => {
    dispatch(setExpandedTransaction(transactionId));
  };

  const handleDropdownIcon = (transactionId) => {
    const isOpen = expandedTransaction === transactionId;
    return (
      <span
        className={`dropdown-icon ${isOpen ? "dropdown-icon-open" : "dropdown-icon-close"}`}
      >
        <FaChevronDown />
      </span>
    );
  };

  const handleDetailsEdit = (e, field, value) => {
    e.stopPropagation();
    setEditingField(field);
    setEditingValue(value);
  };

  const handleSaveEdit = (transactionId) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === transactionId
          ? { ...transaction, [editingField]: editingValue }
          : transaction,
      ),
    );
    setEditingField(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <table className="transactions-table">
      <thead>
        <tr>
          <th></th>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <React.Fragment key={transaction.id}>
            <tr onClick={() => handleRowClick(transaction.id)}>
              <td>{handleDropdownIcon(transaction.id)}</td>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.balance}</td>
            </tr>
            {expandedTransaction === transaction.id && (
              <tr className="transaction-details">
                <td colSpan="1"></td>
                <td colSpan="4">
                  <div className="details-wrapper">
                    <div className="detail">
                      <strong>Transaction Type:</strong> {transaction.type}
                    </div>
                    <div className="detail detail-category">
                      <strong>Category:</strong>
                      {editingField === "category" ? (
                        <select
                          className="category-select"
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onBlur={() => handleSaveEdit(transaction.id)}
                        >
                            {categoryOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                        </select>
                      ) : (
                        <>
                          {transaction.category}{" "}
                          <button
                            className="details-edit"
                            onClick={(e) =>
                              handleDetailsEdit(
                                e,
                                "category",
                                transaction.category,
                              )
                            }
                          >
                            <MdEdit />
                          </button>
                        </>
                      )}
                    </div>
                    <div className="detail detail-notes">
                      <strong>Notes:</strong>
                      {editingField === "notes" ? (
                        <textarea
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onBlur={() => handleSaveEdit(transaction.id)}
                        />
                      ) : (
                        <>
                          {transaction.notes}{" "}
                          <button
                            className="details-edit"
                            onClick={(e) =>
                              handleDetailsEdit(e, "notes", transaction.notes)
                            }
                          >
                            <MdEdit />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;