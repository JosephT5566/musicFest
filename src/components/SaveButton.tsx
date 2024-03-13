import { useRouter } from 'next/router';

import useLocation from 'hooks/useLocation';
import { useGetSelectedShow } from 'providers/ShowsProvider';

import { ShadowIconButton } from 'components/base/Button';
import ShareIcon from '@mui/icons-material/Share';

const SaveButton = (props: { onOpenSnack: () => void }) => {
	const { onOpenSnack } = props;
	const selectedShows = useGetSelectedShow();

	const router = useRouter();
	const url = useLocation();

	const handleClick = async () => {
		const data = btoa(JSON.stringify(selectedShows));
		try {
			await navigator.clipboard.writeText(`${url.host}${url.pathname}#${data}`); // copy to clipboard
			if (data !== '' || url.hash.substring(1) !== '') {
				router.push(`${url.pathname}#${data}`);
			}
			onOpenSnack();
		} catch (error) {
			console.error('Could not copy text: ', error);
		}
	};

	return (
		<ShadowIconButton aria-label="share" onClick={handleClick}>
			<ShareIcon />
		</ShadowIconButton>
	);
};

export default SaveButton;
