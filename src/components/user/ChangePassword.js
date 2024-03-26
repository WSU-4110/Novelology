import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import logoWithCircleBorder from '../../assets/novelology_newlogo.png'; // Path to the Novelology logo in assets

const ResetPasswordPage = (props) => {
  return (
    <div className="w-full min-h-screen overflow-auto flex flex-col items-center justify-center">
      <div className="bg-maroon w-full min-h-[64rem] flex flex-col items-center justify-center relative overflow-hidden">
        <img src={logoWithCircleBorder} alt="Logo" className="mb-5 h-[9.375rem] w-auto" />
        <div className="text-center font-montserrat text-[4.0625rem] leading-normal text-white my-5 flex flex-col items-center">
          <span>Change Password</span>
          <FontAwesomeIcon icon={faTrashCan} className="text-white text-8xl mt-4 mb-4" />
        </div>
        <div className="w-full flex flex-col items-center">
          <label className="text-white font-montserrat text-[1.5rem] mt-4 mb-2">Username</label>
          <input type="text" className="bg-white w-1/5 p-[0.625rem] px-[2.8125rem] rounded-[1.25rem] border-none h-[2.5rem] mb-4" />
          <label className="text-white font-montserrat text-[1.5rem] mt-4 mb-2">New Password</label>
          <input type="password" className="bg-white w-1/5 p-[0.625rem] px-[2.8125rem] rounded-[1.25rem] border-none h-[2.5rem] mb-4" />
          <label className="text-white font-montserrat text-[1.5rem] mt-4 mb-2">Confirm Password</label>
          <input type="password" className="bg-white w-1/5 p-[0.625rem] px-[2.8125rem] rounded-[1.25rem] border-none h-[2.5rem] mb-4" />
        </div>
        <button className="bg-maroon w-[30.625rem] flex justify-center items-center p-[0.625rem] px-[2.8125rem] rounded-[1.25rem] mb-5 mt-[3.75rem] shadow-[0px_0.25rem_0.5rem_rgba(0,0,0,1)] border-none text-white text-[1.5rem] cursor-pointer">
          <span className="font-montserrat text-[1.5rem] text-white no-underline">Save Changes</span>
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;