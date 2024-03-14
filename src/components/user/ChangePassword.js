import React from 'react';

const containerStyle = {
  width: '100%',
  minHeight: '100vh',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center', // Added to center vertically
};

const backgroundStyle = {
  backgroundColor: 'rgba(91, 46, 72, 1)',
  width: '100%',
  height: '1024px',
  display: 'flex',
  alignItems: 'center', // Updated to center horizontally
  justifyContent: 'center', // Updated to center vertically
  flexShrink: '0',
  position: 'relative',
  overflow: 'hidden',
};

const logoStyle = {
  width: '184px',
  height: '172px',
  position: 'absolute',
  top: '30px',
  left: '50%', // Updated to center horizontally
  transform: 'translateX(-50%)', // Added to center horizontally
};

const titleStyle = {
  width: '1184px',
  height: 'auto',
  textAlign: 'center',
  position: 'absolute',
  top: '260px',
  left: '50%', // Updated to center horizontally
  transform: 'translateX(-50%)', // Added to center horizontally
  fontStretch: 'normal',
  fontStyle: 'Regular',
  fontWeight: '400',
  textDecoration: 'none',
  fontFamily: '"Montserrat"',
  fontSize: '65px',
  lineHeight: 'normal',
  color: 'rgb(255, 255, 255)',
};

const inputContainerStyle = {
  width: '417px',
  height: '45px',
  display: 'flex',
  alignItems: 'center',
  gap: '233px',
  flexShrink: '0',
  position: 'absolute',
  top: '50%', // Updated to center vertically
  left: '50%', // Updated to center horizontally
  transform: 'translate(-50%, -50%)', // Added to center vertically and horizontally
};

const inputStyle = {
  backgroundColor: '#ffffff',
  width: '302px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 45px',
  flexShrink: '0',
  borderRadius: '20px',
  overflow: 'hidden',
  height: '30px',
};

const labelStyle = {
  color: 'rgba(255, 255, 255, 1)',
  width: '269px',
  height: 'auto',
  textAlign: 'left',
  lineHeight: 'normal',
  position: 'absolute',
  fontFamily: 'Montserrat',
  fontSize: '24px',
  fontStretch: 'normal',
  fontStyle: 'Regular',
  fontWeight: '400',
  textDecoration: 'none',
};

const buttonStyle = {
  width: '245px',
  height: '65px',
  borderRadius: '20px',
  position: 'absolute',
  top: '50%', // Updated to center vertically
  left: '50%', // Updated to center horizontally
  transform: 'translate(-50%, 50%)', // Added to center vertically and horizontally
};

const buttonTextStyle = {
  color: 'rgba(255, 255, 255, 1)',
  width: '206px',
  height: 'auto',
  textAlign: 'center',
  lineHeight: '20px',
  position: 'absolute',
  fontFamily: 'Montserrat',
  fontSize: '24px',
  fontStretch: 'normal',
  fontStyle: 'Regular',
  fontWeight: '400',
  textDecoration: 'none',
};

const ResetPasswordPage = (props) => {
  return (
    <div style={containerStyle}>
      <div style={backgroundStyle}>
        <div style={inputContainerStyle}>
          <div style={inputStyle}></div>
        </div>
        <span style={labelStyle}>Username</span>
        <div style={{ ...inputContainerStyle, top: '65%' }}>
          <div style={inputStyle}></div>
        </div>
        <span style={{ ...labelStyle, top: '60%' }}>New Password</span>
        <div style={{ ...inputContainerStyle, top: '75%' }}>
          <div style={inputStyle}></div>
        </div>
        <span style={{ ...labelStyle, top: '70%' }}>Confirm Password</span>
        <img src="/logowithcircleborderremovebgpreview14183-mdtji-200h.png" alt="logowithcircleborderremovebgpreview14183" style={logoStyle} />
        <span style={titleStyle}>Change Password</span>
        <img src="/vectori418-298.svg" alt="VectorI418" style={{ width: '90px', height: '100px', position: 'absolute', top: '386px', left: '676px' }} />
        <img src="/rectangle774184-wrqb-200h.png" alt="Rectangle774184" style={buttonStyle} />
        <span style={buttonTextStyle}>Save Changes</span>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
