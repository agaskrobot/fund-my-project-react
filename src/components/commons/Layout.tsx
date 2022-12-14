import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Icon, Menu } from 'semantic-ui-react';
import { FundMyProjectContext } from '../../context/FundMyProjectContext';
import { Error } from './Error';

interface LayoutInterface {
	children: any;
}

export const Layout: React.FC<LayoutInterface> = ({ children }): JSX.Element => {
	const { errorMessage } = useContext(FundMyProjectContext);
	return (
		<Container style={{ paddingTop: '10px' }}>
			{errorMessage && <Error message={errorMessage} />}
			<Menu className="fmp__header">
				<Menu.Item>
					<Link to="/">
						<Icon name="gg" /> FUND MY PROJECT
					</Link>
				</Menu.Item>
				<Menu.Menu position="right">
					<Menu.Item>
						<Link to="/">Projects</Link>
					</Menu.Item>
					<Menu.Item>
						<Link to="/projects/new">+</Link>
					</Menu.Item>
				</Menu.Menu>
			</Menu>
			{children}
		</Container>
	);
};
