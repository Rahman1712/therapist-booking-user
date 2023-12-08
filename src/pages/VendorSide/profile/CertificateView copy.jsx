/* eslint-disable react/prop-types */
import Modal from 'react-modal';
import { MdClose } from "react-icons/md";

const CertificateView = ({ isOpen, onClose, docData }) => {
  const modalStyles = {
    overlay: {
      zIndex: 9999,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      position: 'absolute',
      top: '10%', 
      bottom: '10%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80%',
      maxWidth: '800px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      outline: 'none',
      padding: '20px',
      maxHeight: '80%', 
      overflowY: 'auto',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      shouldCloseOnOverlayClick={false}
      preventScroll
    >
      <div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-xl text-rose-500 hover:text-rose-700 transition focus:outline-none"
          >
            <MdClose />
          </button>
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold mb-4 text-cyan-900 font-roboto-mono">{docData.docName}</h4>
          <div className="p-4">
            <iframe src={docData.docUrl} title={docData.docName} width="100%" height="500" frameBorder="0"></iframe>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CertificateView;
