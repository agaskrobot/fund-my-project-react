import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import { FundMyProjectContext } from '../../context/FundMyProjectContext';
import { Error } from './Error';

interface LayoutInterface {
	children: any;
}

export const Layout: React.FC<LayoutInterface> = ({ children }): JSX.Element => {
	const { errorMessage } = useContext(FundMyProjectContext);
	return (
		<Container>
			{errorMessage && <Error message={errorMessage} />}
			<Menu style={{ marginTop: '10px' }}>
				<Menu.Item>
					<Link to="/">FundMyProject</Link>
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
