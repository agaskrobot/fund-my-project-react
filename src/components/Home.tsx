import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card } from 'semantic-ui-react';

import { FundMyProjectContext } from '../context/FundMyProjectContext';
import { Layout } from './commons/Layout';

export const Home = () => {
	let navigate = useNavigate();
	const { projects } = useContext(FundMyProjectContext);

	return (
		<Layout>
			<h3>Open Projects</h3>
			<Button
				content="Create Project"
				icon="add circle"
				primary
				floated="right"
				onClick={() => navigate('../projects/new', { replace: false })}
			/>
			<Card.Group>
				{projects.map((address: string) => (
					<Card
						className="fmp__card"
						header={address}
						description={<Link to={`/projects/${address}`}>View Project</Link>}
						fluid={true}
					/>
				))}
			</Card.Group>
		</Layout>
	);
};
