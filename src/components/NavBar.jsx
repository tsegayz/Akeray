import { IoIosNotifications, IoIosSearch } from "react-icons/io";
import { GiWaterSplash } from "react-icons/gi";
import { Link } from "react-router-dom";

function NavBar() {
	const links = [
		{ title: "Home", link: "/" },
		{ title: "Movies", link: "/movies" },
		{ title: "Recently Added", link: "/recentlyadded" },
		{ title: "Series", link: "/series" },
	];
	return (
		<div className='series-nav-bar'>
			<nav className='navbar navbar-expand-lg navbar-light'>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav mr-auto'>
						{links.map((item) => (
							<li className='nav-item active' key={item.link}>
								<Link className='nav-link' to={item.link}>
									{item.title}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<Link className='navbar-brand' to='/'>
					Akeray
				</Link>
				<div className='nav-icons'>
					<span>
						<IoIosSearch />
					</span>
					<span>
						<IoIosNotifications />
					</span>
					<Link className='btn btn-outline-light' to='/sign'>
						<div className='btn-icon'>
							<GiWaterSplash />
						</div>
					</Link>
				</div>
			</nav>
		</div>
	);
}

export default NavBar;
