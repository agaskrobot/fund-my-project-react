import { useContext, useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import { FundMyProjectContext } from '../context/FundMyProjectContext';
import { Layout } from './commons/Layout';

export const NewProject = () => {
	const { createProject, isLoading } = useContext(FundMyProjectContext);
	const [minimumContribution, setMinimumContribution] = useState('');

	const handleSubmit = (e: any) => {
		e.preventDefault();
		createProject(minimumContribution);
	};
	return (
		<Layout>
			<Form onSubmit={handleSubmit}>
				<Form.Field>
					<label>Minimum Contribution</label>
					<Input
						value={minimumContribution}
						onChange={(e) => setMinimumContribution(e.target.value)}
						label="wei"
						labelPosition="right"
					/>
				</Form.Field>
				<Button type="submit" primary loading={isLoading}>
					Create!
				</Button>
			</Form>
		</Layout>
	);
};
