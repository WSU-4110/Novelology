import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import logoWithCircleBorder from '../../assets/logo_with_circle_border-removebg.png';

const AccountDeletionPage = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen overflow-hidden bg-maroon" style={{ fontFamily: 'Inknut Antiqua, serif' }}>
      <div className="relative flex flex-col items-center justify-around w-full overflow-hidden p-12" style={{ minHeight: 'calc(100vh - 4rem)' }}>
        <img src={logoWithCircleBorder} alt="Logo" className="mb-6 h-[9.375rem] w-auto" />
        <h1 className="mb-6 text-[4.0625rem] text-center text-white" style={{ fontFamily: 'Inknut Antiqua, serif' }}>Confirm Account Deletion</h1>
        <div className="flex items-center justify-center w-full mt-1 mb-16">
          <FontAwesomeIcon icon={faUnlockKeyhole} className="text-white text-[5rem] h-[6.375rem] w-auto" />
        </div>
        <p className="mb-6 text-[2.5rem] text-center text-white" style={{ fontFamily: 'Inknut Antiqua, serif' }}>
          We’re sorry to see you go.<br />Please note that this action cannot be undone.
        </p>
        <p className="mb-6 text-[1.5rem] text-center font-bold text-white" style={{ fontFamily: 'Inknut Antiqua, serif' }}>
          Please type “CONFIRM DELETION” in the box below to continue.
        </p>
        <input type="text" placeholder="CONFIRM DELETION" className="mb-10 bg-white w-1/5 p-2.5 px-11 rounded-full border-none h-10" />
        <div className="flex justify-between items-center w-full px-[0.1rem]" style={{ maxWidth: '37.5rem' }}>
          <button className="bg-maroon w-[15.625rem] flex justify-center items-center py-2 rounded-full shadow-[0px_0.25rem_0.5rem_rgba(0,0,0,1)] text-white font-bold">
            Delete Account
          </button>
          <button className="bg-maroon w-[15.625rem] flex justify-center items-center py-2 rounded-full shadow-[0px_0.25rem_0.5rem_rgba(0,0,0,1)] text-white font-bold" onClick={handleReturn}>
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDeletionPage;
