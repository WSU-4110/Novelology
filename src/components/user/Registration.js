import NovelologyCircleBorderLogo from '../../NovelologyCircleBorderLogo.png';

const SignUpPage = (props) => {
  // Styles
  const styles = {
    mainContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      minHeight: '100vh',
      overflow: 'auto',
      flexDirection: 'column',
      backgroundColor: 'rgba(91, 46, 72, 1)',
      paddingTop: '20px',
      paddingBottom: '20px',
    },
    logo: {
      width: '184px',
      height: '172px',
      marginBottom: '20px',
    },
    signUpTitle: {
      color: 'rgba(255, 255, 255, 1)',
      fontFamily: 'Montserrat',
      fontSize: '65px',
      fontWeight: '400',
      marginBottom: '20px',
      marginTop: '30px',
      
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '60px',
      marginBottom: '40px',
      marginTop: '30px',
    },
    label: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontFamily: 'Montserrat',
      paddingLeft: '10px',
    },
    input: {
      padding: '10px',
      borderRadius: '20px',
      marginTop: '5px',
      width: '100%',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)', // Added shadow
    },
    createAccountButton: {
      backgroundColor: 'rgba(91, 46, 72, 1)',
      width: '509px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px 45px',
      borderRadius: '20px',
      marginBottom: '20px',
      marginTop: '30px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)', // Added shadow
    },

    signUpWithGoogleButtonText: {
      color: 'rgba(0, 0, 0, 0.8)',
      fontFamily: 'Montserrat',
      fontSize: '18px', // Slightly smaller font size for differentiation
      fontWeight: '400',
      textAlign: 'center', // Center the text within the button
    },
    
    buttonText: {
      color: 'white',
      fontFamily: 'Montserrat',
      fontSize: '20px',
      fontWeight: '400',
    },
    orTextContainer: {
      marginBottom: '20px',
      marginTop: '10px',
    },
    orText: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontFamily: 'Montserrat',
      fontSize: '16px',
    },
    googleButton: {
      backgroundColor: '#ffffff',
      width: '302px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      padding: '10px 45px',
      borderRadius: '20px',
      overflow: 'hidden',
      marginTop: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)', // Added shadow
    },
  };

  // JSX Structure with styles applied
return (
  <div style={styles.mainContainer}>
    <img src={NovelologyCircleBorderLogo} alt="Novelology Logo" style={styles.logo} />

    <span style={styles.signUpTitle}>Sign Up</span>

    <div style={styles.gridContainer}>
      {[
        { name: 'First Name', placeholder: 'Enter your first name' },
        { name: 'Last Name', placeholder: 'Enter your last name' },
        { name: 'Email', placeholder: 'Enter your email address' },
        { name: 'Username', placeholder: 'Choose a username' },
        { name: 'Password', placeholder: 'Create a password' },
        { name: 'Confirm Password', placeholder: 'Confirm your password' }
      ].map((field, index) => (
        <div key={index}>
          <label htmlFor={field.name.toLowerCase().replace(' ', '')} style={styles.label}>{field.name}</label>
          <input
            id={field.name.toLowerCase().replace(' ', '')}
            type={field.name.toLowerCase().includes('password') ? 'password' : 'text'}
            placeholder={field.placeholder}
            style={styles.input}
          />
        </div>
      ))}
    </div>

    <div style={styles.createAccountButton}>
      <span style={styles.buttonText}>Create Account</span>
    </div>

    <div style={styles.orTextContainer}>
      <span style={styles.orText}>---------- OR ----------</span>
    </div>

    <div style={styles.googleButton}>
      <span style={styles.signUpWithGoogleButtonText}>Sign Up With Google</span>
    </div>
  </div>
);

}

export default SignUpPage;
