import React from 'react';
import lockIcon from '../../assets/lock-icon.png'; // Path to lock icon asset
import logoWithCircleBorder from '../../assets/logo_with_circle_border-removebg.png'; // Path to logo asset

// Styles
const pageStyles = () => ({
  width: '100%',
  minHeight: '100vh',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const backgroundStyles = () => ({
  backgroundColor: 'rgba(91, 46, 72, 1)',
  width: '100%',
  minHeight: '1024px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
});

const logoStyles = () => ({
  marginBottom: '20px',
  height: '150px', // Example size, adjust as needed
  width: 'auto',
});

const headerStyles = () => ({
  textAlign: 'center',
  fontFamily: '"Montserrat"',
  fontSize: '65px',
  lineHeight: 'normal',
  color: 'rgb(255, 255, 255)',
  margin: '20px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const lockIconStyles = () => ({
  width: '110px', // Adjust size as needed
  height: 'auto',
  marginBottom: '20px', // Space between icon and heading
  filter: 'invert(100%)', 
  marginTop: '50px' // Invert colors to make the icon appear white
});


const labelStyles = () => ({
  color: 'white',
  fontFamily: 'Montserrat',
  fontSize: 24,
  margin: '10px 0',
  alignSelf: 'flex-start',
  marginLeft: '41%',
});

const inputContainerStyles = () => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  margin: '10px 0',
});

const inputStyles = () => ({
  backgroundColor: '#ffffff',
  width: '20%',
  padding: '10px 45px',
  borderRadius: '20px',
  border: 'none',
  height: '40px',
});

const buttonStyles = () => ({
  backgroundColor: 'rgba(91, 46, 72, 1)',
  width: '490px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 45px',
  borderRadius: '20px',
  marginBottom: '20px',
  marginTop: '60px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)',
  border: 'none',
  color: 'white',
  fontSize: '24px',
  cursor: 'pointer',
});

const buttonTextStyles = () => ({
  fontFamily: 'Montserrat',
  fontSize: '24px',
  color: 'white',
  textDecoration: 'none',
});

// Component
const ResetPasswordPage = (props) => {
  return (
    <div style={pageStyles()}>
      <div style={backgroundStyles()}>
        <img src={logoWithCircleBorder} alt="Logo" style={logoStyles()} />
        <div style={headerStyles()}>
          <span>Change Password</span>
          <img src={lockIcon} alt="Lock Icon" style={lockIconStyles()} />
        </div>
        <label style={labelStyles()}>Username</label>
        <div style={inputContainerStyles()}>
          <input type="text" style={inputStyles()} />
        </div>
        <label style={labelStyles()}>New Password</label>
        <div style={inputContainerStyles()}>
          <input type="password" style={inputStyles()} />
        </div>
        <label style={labelStyles()}>Confirm Password</label>
        <div style={inputContainerStyles()}>
          <input type="password" style={inputStyles()} />
        </div>
        <button style={buttonStyles()}>
          <span style={buttonTextStyles()}>Save Changes</span>
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
