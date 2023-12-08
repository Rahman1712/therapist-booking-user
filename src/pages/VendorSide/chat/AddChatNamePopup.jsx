/* eslint-disable react/prop-types */
import { useState } from 'react';
import Modal from 'react-modal';
import { getAvatar } from '../../../utils/AvatarUtils';

const AddChatNamePopup = ({ isOpen, onClose, onSubmit, bookedUsers }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [userColors, setUserColors] = useState({}); // Maintain user colors

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleSubmit = () => {
    if (selectedUser) {
      onSubmit(selectedUser);
      setSelectedUser(null);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none"
      overlayClassName="fixed inset-0 bg-transparent"
    >
      <div className="bg-white w-96 p-6 rounded-md shadow-lg font-poppins">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Add to Chat</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Select a User:
          </label>
          <ul className="list-none p-0 mt-2">
            {bookedUsers.map((user, i) => (
              <li
                key={i}
                onClick={() => handleUserClick(user)}
                className={`flex items-center cursor-pointer p-2 rounded-md ${
                  selectedUser && selectedUser.userId === user.userId
                    ? 'bg-blue-100'
                    : ''
                }`}
              >
                {/* <img
                  src={user.imageUrl}
                  alt={user.fullname}
                  className="w-8 h-8 rounded-full mr-2"
                /> */}
                {getAvatar(user, userColors, setUserColors)} {/* Use getAvatar from AvatarUtils */}
                <span>{user.fullname}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end mt-5">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-slate-200 hover:bg-white hover:shadow-xl border-2 text-gray-900 rounded-full"
          >
            Add to Chat
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddChatNamePopup;
