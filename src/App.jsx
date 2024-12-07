import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import HomeScreen from "./pages/HomeScreen";
import SignScreen from "./pages/SignScreen";
import SeriesScreen from "./pages/SeriesScreen";
import EachSeries from "./pages/EachSeries";
import SeasonScreen from "./pages/SeasonScreen";

function App() {

	const [movies, setMovies] = useState([]);
	const [series, setSeries] = useState([]);
	
	const apiKey = import.meta.env.VITE_TMDB_API_KEY;

	const fetchData = async () => {
		try {

			const response = await axios.get(
				`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`
			);
			const { results } = response.data;
			setMovies(results);

			const response1 = await axios.get(
				`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`
			);
			const { results: tvResults } = response1.data; 
			setSeries(tvResults)
			// console.log("Series:", tvResults);		
			
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className='App'>
			<Router>
				<div className='content'>
					<Routes>
						<Route path='/' element={<HomeScreen  movies={movies}/>} />
						<Route path='/sign' element={<SignScreen/>} />
						<Route path='/series' element={<SeriesScreen series={series}/>} />
						<Route path='/each-series/:itemId' element={<EachSeries series={series}/>} />
						<Route path='/seasons/:itemId' element={<SeasonScreen series={series}/>} />
					</Routes>
				</div>
			</Router>
		</div>
	);
}
export default App;
