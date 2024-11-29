import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import SignScreen from "./pages/SignScreen";
import SeriesScreen from "./pages/SeriesScreen";

function App() {
	return (
		<div className='App'>
			<Router>
				<div className='content'>
					<Routes>
						<Route path='/' element={<HomeScreen />} />
						<Route path='/sign' element={<SignScreen/>} />
						<Route path='/series' element={<SeriesScreen/>} />
					</Routes>
				</div>
			</Router>
		</div>
	);
}
export default App;
