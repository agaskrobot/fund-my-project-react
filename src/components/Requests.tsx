import { ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Header, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import { FundMyProjectContext } from '../context/FundMyProjectContext';
import { Layout } from './commons/Layout';

interface RequestRowInterface {
	id: number;
	request: any;
	approversCount: number;
	onApprove: any;
	onFinalize: any;
}

const RequestRow: React.FC<RequestRowInterface> = ({
	id,
	request,
	approversCount,
	onApprove,
	onFinalize
}): JSX.Element => {
	const readyToFinalize = request.approvalCount.toNumber() > approversCount / 2;
	return (
		<TableRow disabled={request.complete} positive={!request.complete && readyToFinalize}>
			<TableCell>{id}</TableCell>
			<TableCell>{request.description}</TableCell>
			<TableCell>{ethers.utils.formatEther(request.value)}</TableCell>
			<TableCell>{request.recipient}</TableCell>
			<TableCell>
				{request.approvalCount.toNumber()}/{approversCount}
			</TableCell>
			<TableCell>
				{!request.complete && (
					<Button color="green" basic onClick={onApprove}>
						Approve
					</Button>
				)}
			</TableCell>
			<TableCell>
				{!request.complete && (
					<Button color="teal" basic onClick={onFinalize} disabled={!readyToFinalize}>
						Finalize
					</Button>
				)}
			</TableCell>
		</TableRow>
	);
};

export const Requests = () => {
	let { projectAddress } = useParams();
	const { getRequestsCount, getRequestDetails, getApproversCount, approveRequest, finalizeRequest } =
		useContext(FundMyProjectContext);
	const [requests, setRequests] = useState<Array<any>>([]);
	const [approversCount, setApproversCount] = useState<number>(0);

	useEffect(() => {
		if (projectAddress) {
			const getRequests = async () => {
				// Get requests count
				let requestCount: any = await getRequestsCount(projectAddress);
				// For each index get request details
				let requests = await Promise.all(
					Array(requestCount.toNumber())
						.fill(0)
						.map((e, index) => {
							return getRequestDetails(projectAddress, index);
						})
				);
				setRequests(requests);
			};
			const getApprovers = async () => {
				const approversCount: any = await getApproversCount(projectAddress);
				setApproversCount(approversCount.toNumber());
			};
			getRequests();
			getApprovers();
		}
	}, [projectAddress]);

	return (
		<Layout>
			<h3>Requests</h3>
			<Link to={`/projects/${projectAddress}/requests/new`}>Add Request</Link>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHeaderCell>ID</TableHeaderCell>
						<TableHeaderCell>Description</TableHeaderCell>
						<TableHeaderCell>Amount</TableHeaderCell>
						<TableHeaderCell>Recipient</TableHeaderCell>
						<TableHeaderCell>Approval Count</TableHeaderCell>
						<TableHeaderCell>Approve</TableHeaderCell>
						<TableHeaderCell>Finalize</TableHeaderCell>
					</TableRow>
				</TableHeader>
				<TableBody>
					{requests.map((request, index) => (
						<RequestRow
							key={index}
							id={index}
							request={request}
							approversCount={approversCount}
							onApprove={() => approveRequest(projectAddress, index)}
							onFinalize={() => finalizeRequest(projectAddress, index)}
						/>
					))}
				</TableBody>
			</Table>
			<div>Found {requests.length} requests.</div>
		</Layout>
	);
};
