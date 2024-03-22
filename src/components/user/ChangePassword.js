import React from 'react';
import lockIcon from '../../assets/lock-icon.png'; // Path to lock icon asset
import logoWithCircleBorder from '../../assets/logo_with_circle_border-removebg.png'; // Path to novelology logo in assets

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
  backgroundColor: '#5B2E48',
  width: '100%',
  minHeight: '64rem', // Converted from 1024px
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
});

const logoStyles = () => ({
  marginBottom: '1.25rem', // Converted from 20px
  height: '9.375rem', // Converted from 150px, assuming the logo should scale relatively
  width: 'auto',
});

const headerStyles = () => ({
  textAlign: 'center',
  fontFamily: '"Montserrat"',
  fontSize: '4.0625rem', // Converted from 65px
  lineHeight: 'normal',
  color: 'white',
  margin: '1.25rem 0', // Converted from 20px
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const lockIconStyles = () => ({
  width: '6.875rem', // Converted from 110px
  height: 'auto',
  marginBottom: '1.25rem', // Converted from 20px
  filter: 'invert(100%)',
  marginTop: '3.125rem', // Converted from 50px
});

const labelStyles = () => ({
  color: 'white',
  fontFamily: 'Montserrat',
  fontSize: '1.5rem', // Converted from 24px
  margin: '0.625rem 0', // Converted from 10px
  alignSelf: 'flex-start',
  marginLeft: '52.5625rem', // Converted from 41%, this might need adjusting based on layout width
});

const inputContainerStyles = () => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  margin: '0.625rem 0', // Converted from 10px
});

const inputStyles = () => ({
  backgroundColor: 'white',
  width: '20%', // Consider using max-width with rem for better responsiveness
  padding: '0.625rem 2.8125rem', // Converted from 10px padding and 45px for horizontal padding
  borderRadius: '1.25rem', // Converted from 20px
  border: 'none',
  height: '2.5rem', // Converted from 40px
});

const buttonStyles = () => ({
  backgroundColor: '#5B2E48',
  width: '30.625rem', // Converted from 490px, consider max-width for responsiveness
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0.625rem 2.8125rem', // Converted from 10px padding and 45px for horizontal padding
  borderRadius: '1.25rem', // Converted from 20px
  marginBottom: '1.25rem', // Converted from 20px
  marginTop: '3.75rem', // Converted from 60px
  boxShadow: '0px 0.25rem 0.5rem rgba(0, 0, 0, 1)', // Converted shadow dimensions
  border: 'none',
  color: 'white',
  fontSize: '1.5rem', // Converted from 24px
  cursor: 'pointer',
});

const buttonTextStyles = () => ({
  fontFamily: 'Montserrat',
  fontSize: '1.5rem', // Converted from 24px
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
