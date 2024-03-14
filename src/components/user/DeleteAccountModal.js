import React from 'react';

// Style for the page container
const pageContainerStyle = {
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
};

// Style for the main content area
const mainContentStyle = {
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
};

// Style for the group of texts
const textGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
};

// Style for the logo image
const logoImageStyle = {
  margin: '20px 0',
};

// Style for the header text
const headerTextStyle = {
  color: 'rgba(255, 255, 255, 1)',
  textAlign: 'center',
  fontFamily: 'Montserrat',
  fontSize: '65px',
  margin: '20px 0',
};

// Style for the informative text
const infoTextStyle = {
  color: 'rgba(255, 255, 255, 1)',
  textAlign: 'center',
  fontFamily: 'Inknut Antiqua',
  fontSize: '40px',
  margin: '20px 0',
};

// Style for the button container
const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '600px',
  marginTop: 'auto',
  padding: '0 20px',
};

// Style for the confirmation input
const confirmationInputStyle = {
  padding: '10px',
  borderRadius: '20px',
  marginTop: '5px',
  width: '500px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)',
};

// Style for the confirmation text
const confirmationTextStyle = {
  textAlign: 'center',
  color: 'rgba(255, 255, 255, 1)',
  fontFamily: 'Inknut Antiqua',
  fontSize: '24px',
  fontWeight: 700,
  margin: '20px 0',
};

// Style for the action buttons
const actionButtonStyle = {
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
};

const buttonTextStyle = {
  color: 'white', // Set the text color
  fontSize: '16px', // Set the font size
  fontWeight: 'bold', // Set the font weight to bold
};


// Component for the Account Deletion Page
const AccountDeletionPage = (props) => {
  return (
    <div style={pageContainerStyle}> {/* Page Container */}
      <div style={mainContentStyle}> {/* Main Content */}
        <img
          src="/logowithcircleborderremovebgpreview14184-p02j-200h.png"
          alt="logo"
          style={logoImageStyle} // Logo Image
        />
        <div style={textGroupStyle}> {/* Text Group */}
          <span style={headerTextStyle}>Confirm Account Deletion</span> {/* Header Text */}
          <span style={infoTextStyle}> {/* Information Text */}
            We’re sorry to see you go.<br />
            Please note that this action cannot be undone.
          </span>
          <span style={confirmationTextStyle}> {/* Confirmation Text */}
            Please type “CONFIRM DELETION” in the box below to continue.
          </span>
          <input
            type="text"
            placeholder="CONFIRM DELETION"
            style={confirmationInputStyle} // Confirmation Input
          />
        </div>
        <div style={buttonContainerStyle}> {/* Button Container */}
          <button style={actionButtonStyle}><span style={buttonTextStyle}>Delete</span></button> {/* Delete Button */}
          <button style={actionButtonStyle}><span style={buttonTextStyle}>Return</span></button> {/* Return Button */}
        </div>
      </div>
    </div>
  );
};

export default AccountDeletionPage;
