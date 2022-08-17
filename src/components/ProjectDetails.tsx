import { ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Form, Grid, Input } from 'semantic-ui-react';
import { FundMyProjectContext } from '../context/FundMyProjectContext';
import { Layout } from './commons/Layout';

type ProjectDetails = {
	minimumContribution: string;
	balance: string;
	requestsCount: number;
	approversCount: number;
	manager: string;
};

const initialProjectDetails = {
	minimumContribution: '0',
	balance: '0',
	requestsCount: 0,
	approversCount: 0,
	manager: '0'
};

export const ProjectDetails = () => {
	let { projectAddress } = useParams();
	const { getProjectSummary, isLoading, contribute } = useContext(FundMyProjectContext);
	const [projectDetails, setProjectDetails] = useState<ProjectDetails>(initialProjectDetails);
	const [contribution, setContribution] = useState('');

	const handleSubmit = (e: any) => {
		e.preventDefault();
		 contribute(projectAddress, contribution);
	};
	useEffect(() => {
		if (projectAddress) {
			getProjectSummary(projectAddress).then((projectDetails: any) =>
				setProjectDetails({
					minimumContribution: projectDetails[0].toNumber(),
					balance: ethers.utils.formatUnits(projectDetails[1], 'ether'),
					requestsCount: projectDetails[2].toNumber(),
					approversCount: projectDetails[3].toNumber(),
					manager: projectDetails[4]
				})
			);
		}
	}, [projectAddress]);

	return (
		<Layout>
			<h3>Campaign Show</h3>
			<Grid>
				<Grid.Row>
					<Grid.Column width={10}>
						<Card.Group>
							<Card
								className="fmp__card"
								header={projectDetails.manager}
								meta="Address of Manager"
								description="The manager created this campaign and can create requests to withdraw money"
								style={{ overflowWrap: 'break-word' }}
							/>
							<Card
								className="fmp__card"
								header={projectDetails.minimumContribution}
								meta="Minimum Contribution (wei)"
								description="You must contribute at least this much wei to become an approver"
							/>
							<Card
								className="fmp__card"
								header={projectDetails.requestsCount}
								meta="Number of Requests"
								description="A request tries to withdraw money from the contract. Requests must be approved by approvers"
								style={{ overflowWrap: 'break-word' }}
							/>
							<Card
								className="fmp__card"
								header={projectDetails.approversCount}
								meta="Number of Approvers"
								description="Number of people who have already donated to this campaign"
							/>
							<Card
								className="fmp__card"
								header={projectDetails.balance}
								meta="Campaign Balance (ether)"
								description="The balance is how much money this campaign has left to spend."
							/>
						</Card.Group>
					</Grid.Column>
					<Grid.Column width={6}>
						<Form onSubmit={handleSubmit}>
							<Form.Field>
								<label className="fmp__label">Amount to Contribute</label>
								<Input
									value={contribution}
									onChange={(e) => setContribution(e.target.value)}
									label="ether"
									labelPosition="right"
								/>
							</Form.Field>
							<Button type="submit" primary loading={isLoading}>
								Contribute!
							</Button>
						</Form>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<Grid.Column>
						<Link to={`/projects/${projectAddress}/requests`}>View Requests</Link>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Layout>
	);
};
