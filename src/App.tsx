import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Home, NewProject } from './components';
import { FundMyProjectProvider } from './context/FundMyProjectContext';

function App() {
	return (
		<BrowserRouter>
			<FundMyProjectProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="projects">
						<Route path="new" element={<NewProject />} />
						<Route path=":projectAddress" element={<>ProjectDetails</>} />
						<Route path=":projectAddress/requests" element={<>Requests</>} />
						<Route path=":projectAddress/requests/new" element={<>NewRequest</>} />
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
	);
}

export default App;
