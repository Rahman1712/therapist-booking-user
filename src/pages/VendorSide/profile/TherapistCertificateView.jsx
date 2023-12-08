/* eslint-disable react/prop-types */
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';

const TherapistCertificateView = ({ isOpen, onClose, docData }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50"
      style={{
        overlay: {
          zIndex: 9999,
        },
      }}
      shouldCloseOnOverlayClick={false}
    >
      <div className="relative bg-white w-11/12 sm:w-5/6 md:w-5/6 lg:w-4/6 xl:w-2/5 max-h-80vh mx-auto rounded-lg shadow-lg">
        <div className="absolute top-2 right-2">
          <button onClick={onClose} className="text-3xl text-rose-500 hover:text-rose-700 focus:outline-none">
            <MdClose />
          </button>
        </div>
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4 text-cyan-900 font-roboto-mono">{docData.docName}</h4>
          <div className="p-4">
            <iframe src={docData.docUrl} title={docData.docName} className="w-full h-80vh md:h-96" frameBorder="0"></iframe>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TherapistCertificateView;
