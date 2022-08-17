import { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Form, Input } from 'semantic-ui-react';
import { FundMyProjectContext } from '../context/FundMyProjectContext';
import { Layout } from './commons/Layout';

export const NewRequest = () => {
	let { projectAddress } = useParams();
	const { createRequest, isLoading } = useContext(FundMyProjectContext);
	const [description, setDescription] = useState('');
	const [value, setValue] = useState('');
	const [recipient, setRecipient] = useState('');

	const handleSubmit = (e: any) => {
		e.preventDefault();
		createRequest(projectAddress, description, value, recipient);
	};
	return (
		<Layout>
			<Link to={`/projects/${projectAddress}/requests`}>Back</Link>
			<h3>Create a Request</h3>
			<Form onSubmit={handleSubmit}>
				<Form.Field>
					<label className="fmp__label">Description</label>
					<Input value={description} onChange={(e) => setDescription(e.target.value)} />
				</Form.Field>
				<Form.Field>
					<label className="fmp__label">Value in Ether</label>
					<Input value={value} onChange={(e) => setValue(e.target.value)} />
				</Form.Field>
				<Form.Field>
					<label className="fmp__label">Recipient</label>
					<Input value={recipient} onChange={(e) => setRecipient(e.target.value)} />
				</Form.Field>
				<Button primary loading={isLoading}>
					Create!
				</Button>
			</Form>
		</Layout>
	);
};
