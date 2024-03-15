import AuthorVerify from "../components/AuthorVerify.js";
import NavigationBar from "../components/NavigationBar.js";
function AuthorVerification({showNavBar}) {
    return (
        <>
            {showNavBar && <NavigationBar />}

            <div className="verify">
                <center>
                {/* <h1 class="text-2xl	font-semibold"> Author Verification Page</h1> */}
                <AuthorVerify />
                </center>
            </div>
        </>
    );
}
export default AuthorVerification;