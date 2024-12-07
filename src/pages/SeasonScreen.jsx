import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

function SeasonScreen() {
	const location = useLocation();
	const { itemData } = location.state;
	return (
		<div className='season-screen'>
			<div
				className=''
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/w500/${itemData.poster_path})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			>
				<div className='container'>
					<NavBar />
				</div>
			</div>
		</div>
	);
}

export default SeasonScreen;
