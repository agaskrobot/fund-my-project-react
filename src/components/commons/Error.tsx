import { Message } from 'semantic-ui-react';

interface MessageInterface {
	message: string;
}

export const Error: React.FC<MessageInterface> = ({ message }): JSX.Element => {
	return (
		<Message negative>
			<Message.Header>Error</Message.Header>
			<p>{message}</p>
		</Message>
	);
};
