import './AccountHeader.css';
import { useSelector } from 'react-redux';

const AccountHeader = () => {
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);

  return (
    <div className="header">
      <h1>Welcome back<br/>{firstName} {lastName}!</h1>
      <button className="edit-button">Edit Name</button>
    </div>
  );
}

export default AccountHeader;