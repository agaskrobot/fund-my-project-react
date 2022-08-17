import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractFactoryABI, contractAddress, contractFundMyProjectABI } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

export const FundMyProjectContext = React.createContext({
	projects: [''],
	errorMessage: '',
	isLoading: false,
	createProject: async (contribution: string) => {},
	getProjectSummary: async (address: string) => {},
	contribute: async (address: any, amount: string) => {},
	createRequest: async (address: any, description: string, value: string, recipient: string) => {},
	getRequestsCount: async (address: any) => {},
	getRequestDetails: async (address: any, index: any) => {},
	getApproversCount: async (address: any) => {},
	approveRequest: async (address: any, index: any) => {},
	finalizeRequest: async (address: any, index: any) => {}
});

const { ethereum } = window;

// Fund My Project Factory contract
const getFactoryContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const fundMyProjectFactoryContract = new ethers.Contract(contractAddress, contractFactoryABI, signer);

	return fundMyProjectFactoryContract;
};

// Fund My Project contract
const getFundMyProjectContract = (address: string) => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const fundMyProjectFactoryContract = new ethers.Contract(address, contractFundMyProjectABI, signer);

	return fundMyProjectFactoryContract;
};

export const FundMyProjectProvider = (props: any) => {
	const navigate = useNavigate();
	const { children } = props;
	const [projects, setProjects] = useState<Array<string>>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const createProject = async (contribution: string) => {
		setIsLoading(true);
		try {
			if (!ethereum) return alert('Please install metamask');
			const fundMyProjectFactoryContract = getFactoryContract();
			const parsedAmount = ethers.utils.parseUnits(contribution, 'wei');
			const createProject = await fundMyProjectFactoryContract.createProject(parsedAmount);
			await createProject.wait();
			navigate('/', { replace: false });
		} catch (error: any) {
			setErrorMessage(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	const getProjectSummary = async (address: string) => {
		const fundMyProject = getFundMyProjectContract(address);
		const project = await fundMyProject.getSummary();
		return project;
	};

	const contribute = async (address: any, amount: string) => {
		setIsLoading(true);
		try {
			if (!ethereum) return alert('Please install metamask');
			const fundMyProject = getFundMyProjectContract(address);
			const accounts = await ethereum.request({ method: 'eth_accounts' });
			const sendContribution = await fundMyProject.contribute({
				from: accounts[0],
				value: ethers.utils.parseEther(amount)
			});
			await sendContribution.wait();
			window.location.reload();
		} catch (error: any) {
			setErrorMessage(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const createRequest = async (address: any, description: string, value: string, recipient: string) => {
		setIsLoading(true);
		try {
			if (!ethereum) return alert('Please install metamask');
			const fundMyProject = getFundMyProjectContract(address);
			const parsedAmount = ethers.utils.parseEther(value);
			const sendContribution = await fundMyProject.createRequest(description, parsedAmount, recipient);
			await sendContribution.wait();
			navigate(`projects/${address}/requests`, { replace: false });
		} catch (error: any) {
			setErrorMessage(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const getRequestsCount = async (address: string) => {
		const fundMyProject = getFundMyProjectContract(address);
		const requestCount = await fundMyProject.getRequestsCount();
		return requestCount;
	};

	const getRequestDetails = async (address: any, index: any) => {
		const fundMyProject = getFundMyProjectContract(address);
		const requestDetails = await fundMyProject.requests(index);
		return requestDetails;
	};

	const getApproversCount = async (address: string) => {
		const fundMyProject = getFundMyProjectContract(address);
		const approversCount = await fundMyProject.approversCount();
		return approversCount;
	};

	const approveRequest = async (address: any, index: any) => {
		const fundMyProject = getFundMyProjectContract(address);
		const approve = await fundMyProject.approveRequest(index);
		await approve.wait();
		window.location.reload();
	};

	const finalizeRequest = async (address: any, index: any) => {
		const fundMyProject = getFundMyProjectContract(address);
		const approve = await fundMyProject.finalizeRequest(index);
		await approve.wait();
		window.location.reload();
	};

	useEffect(() => {
		if (!ethereum) return alert('Please install metamask');
		const getAccount = async () => {
			// Connect to metamask
			await ethereum.request({ method: 'eth_requestAccounts' });
			// Get projects list
			const fundMyProjectFactoryContract = getFactoryContract();
			let projects = await fundMyProjectFactoryContract.getDeployedProjects();
			setProjects(projects);
		};
		getAccount();
	}, []);

	useEffect(() => {
		if (errorMessage) {
			const timer = setTimeout(() => {
				// Clear error after 5 sec
				setErrorMessage('');
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [errorMessage]);

	return (
		<FundMyProjectContext.Provider
			value={{
				projects,
				errorMessage,
				isLoading,
				createProject,
				getProjectSummary,
				contribute,
				createRequest,
				getRequestsCount,
				getRequestDetails,
				getApproversCount,
				approveRequest,
				finalizeRequest
			}}
		>
			{children}
		</FundMyProjectContext.Provider>
	);
};
