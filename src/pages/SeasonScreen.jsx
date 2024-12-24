import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import { motion } from "framer-motion";

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

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
			>
				<p> the table </p>
			</motion.div>
		</div>
	);
}

export default SeasonScreen;
