import './LoginForm.css';
import { FaUserCircle } from "react-icons/fa";

const LoginForm = () => {
    return (
            <div className="sign-in-content">
                <FaUserCircle className="sign-in-icon"/>
                <h1>Sign In</h1>
                <form>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label
                        ><input type="text" id="username"/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label
                        ><input type="password" id="password"/>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me"/><label htmlFor="remember-me"
                    >Remember me</label
                    >
                    </div>
                    {/*// <!-- PLACEHOLDER DUE TO STATIC SITE -->*/}
                    <a href="./profile" className="sign-in-button">Sign In</a>
                    {/*// <!-- SHOULD BE THE BUTTON BELOW -->*/}
                    {/*// <!-- <button class="sign-in-button">Sign In</button> -->*/}
                    {/*// <!--  -->*/}
                </form>
            </div>
    );
}

export default LoginForm;