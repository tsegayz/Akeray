import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";

function App() {
	return (
		<div className='App'>
			<Router>
				<div className='content'>
					<Routes>
						<Route
							path='/'
							element={
								<>
									<HomeScreen />
								</>
							}
						/>
					</Routes>
				</div>
			</Router>
		</div>
	);
}
export default App;
