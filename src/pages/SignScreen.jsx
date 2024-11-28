import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import { useState } from "react";
// import img from "../assets/blackish.jpg";

function SignScreen() {
	const [isRightPanelActive, setIsRightPanelActive] = useState(false);

	const handleOverlayClick = () => {
		setIsRightPanelActive((prev) => !prev);
	};
	return (
		<div className='sign-screen'>
			<div
				className={`container  ${
					isRightPanelActive ? "right-panel-active" : ""
				}`}
				id='container'
			>
				<div className='form-container sign-up-container'>
					<form action='#'>
						<h1>Create Account</h1>
						<div className='social-container'>
							<a href='#' className='social'>
								<FaFacebookF />
							</a>
							<a href='#' className='social'>
								<FaGooglePlusG />
							</a>
							<a href='#' className='social'>
								<FaLinkedinIn />
							</a>
						</div>
						<span>or use your email for registration</span>
						<div className='infield'>
							<input type='text' placeholder='Name' />
							<label></label>
						</div>
						<div className='infield'>
							<input type='email' placeholder='Email' name='email' />
							<label></label>
						</div>
						<div className='infield'>
							<input type='password' placeholder='Password' />
							<label></label>
						</div>
						<button>Sign Up</button>
					</form>
				</div>
				<div className='form-container sign-in-container'>
					<form action='#'>
						<h1>Sign in </h1>
						<div className='social-container'>
							<a href='#' className='social'>
								<FaFacebookF />
							</a>
							<a href='#' className='social'>
								<FaGooglePlusG />
							</a>
							<a href='#' className='social'>
								<FaLinkedinIn />
							</a>
						</div>
						<span>or use your account</span>
						<div className='infield'>
							<input type='email' placeholder='Email' name='email' />
							<label></label>
						</div>
						<div className='infield'>
							<input type='password' placeholder='Password' />
							<label></label>
						</div>
						<a href='#' className='forgot'>
							Forgot your password?
						</a>
						<button>Sign In</button>
					</form>
				</div>
				<div className='overlay-container' id='overlayCon'>
					<div className='overlay'>
						<div className='overlay-panel overlay-left'>
							<h1>Welcome Back!</h1>
							<p>
								To keep connected with us please login with your personal info
							</p>
							<button>Sign In</button>
						</div>
						<div className='overlay-panel overlay-right'>
							<h1>Hello, Friend!</h1>
							<p>Enter your personal details and start journey with us</p>
							<button>Sign Up</button>
						</div>
					</div>
					<button id='overlayBtn' onClick={handleOverlayClick}></button>
				</div>
			</div>
		</div>
	);
}

export default SignScreen;
