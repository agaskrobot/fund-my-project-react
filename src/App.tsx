import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, NewProject, NewRequest, ProjectDetails, Requests } from './components';
import { FundMyProjectProvider } from './context/FundMyProjectContext';
import 'semantic-ui-css/semantic.min.css';
import './index.scss';

function App() {
	return (
		<div className="fmp__container">
			<BrowserRouter>
				<FundMyProjectProvider>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="projects">
							<Route path="new" element={<NewProject />} />
							<Route path=":projectAddress" element={<ProjectDetails />} />
							<Route path=":projectAddress/requests" element={<Requests />} />
							<Route path=":projectAddress/requests/new" element={<NewRequest />} />
						</Route>
						<Route
							path="*"
							element={
								<div style={{ padding: '1rem' }}>
									<p>There's nothing here!</p>
								</div>
							}
						/>
					</Routes>
				</FundMyProjectProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
