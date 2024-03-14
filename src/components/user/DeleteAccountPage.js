import React from 'react';
import { useNavigate } from 'react-router-dom';
import trashIcon from '../../assets/trash-icon.png'; // Path to trash icon asset in src/assets
import logoWithCircleBorder from '../../assets/logo_with_circle_border-removebg.png'; // Path to logo asset in src/assets

// Page Container Style
const pageContainerStyle = () => ({
    backgroundColor: 'rgba(91, 46, 72, 1)', // Set background color here
    width: '100%',
    minHeight: '100vh', // Set minimum height to cover the entire viewport
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
});

// Main Content Area Style
const mainContentStyle = () => ({
    backgroundColor: 'rgba(91, 46, 72, 1)',
    width: '100%',
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '20px',
    boxSizing: 'border-box',
});

// Group of Texts Style
const textGroupStyle = () => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
});

// Logo Image Style
const logoImageStyle = () => ({
    margin: '20px 0',
    width: '180px',
    height: 'auto',
});

// Trash Icon Style
const trashIconStyle = () => ({
    margin: '10px 0',
    filter: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
});

// Header Text Style
const headerTextStyle = () => ({
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: '65px',
    margin: '20px 0',
});

// Informative Text Style
const infoTextStyle = () => ({
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    fontFamily: 'Inknut Antiqua',
    fontSize: '40px',
    margin: '20px 0',
});

// Confirmation Input Style
const confirmationInputStyle = () => ({
    padding: '10px',
    borderRadius: '20px',
    marginTop: '5px',
    width: '500px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)',
});

// Confirmation Text Style
const confirmationTextStyle = () => ({
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: 'Inknut Antiqua',
    fontSize: '24px',
    fontWeight: 700,
    margin: '20px 0',
});

// Button Container Style
const buttonContainerStyle = () => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '600px',
    marginTop: 'auto',
    padding: '0 20px',
});

// Action Button Style
const actionButtonStyle = () => ({
    backgroundColor: 'rgba(91, 46, 72, 1)',
    width: '250px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 45px',
    borderRadius: '20px',
    marginBottom: '20px',
    marginTop: '30px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)',
});

// Button Text Style
const buttonTextStyle = () => ({
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
});

// Main Account Deletion Page Component
const AccountDeletionPage = () => {
  const navigate = useNavigate(); 

  // Navigate back to home after deletion
  const handleDelete = () => {
      console.log("Account is being deleted...");
      // Add deletion logic here
      navigate('/'); 
  };

  // Navigate back to previous page
  const handleReturn = () => {
      navigate(-1);
  };

  return (
      <div style={pageContainerStyle()}>
          <div style={mainContentStyle()}>
              <img src={logoWithCircleBorder} alt="logo" style={logoImageStyle()} />
              <div style={textGroupStyle()}>
                  <span style={headerTextStyle()}>Confirm Account Deletion</span>
                  <img src={trashIcon} alt="Trash icon" style={trashIconStyle()} />
                  <span style={infoTextStyle()}>
                      We’re sorry to see you go.<br />
                      Please note that this action cannot be undone.
                  </span>
                  <span style={confirmationTextStyle()}>
                      Please type “CONFIRM DELETION” in the box below to continue.
                  </span>
                  <input type="text" placeholder="CONFIRM DELETION" style={confirmationInputStyle()} />
              </div>
              <div style={buttonContainerStyle()}>
                  <button style={actionButtonStyle()} onClick={handleDelete}>
                      <span style={buttonTextStyle()}>Delete Account</span>
                  </button>
                  <button style={actionButtonStyle()} onClick={handleReturn}>
                      <span style={buttonTextStyle()}>Return</span>
                  </button>
              </div>
          </div>
      </div>
  );
};

export default AccountDeletionPage;
