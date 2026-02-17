import { useRouter } from 'next/navigation';

import useLocation from 'hooks/useLocation';
import { useGetSelectedShow } from 'providers/ShowsProvider';

import { ShadowIconButton } from 'components/base/Button';
import { Share } from 'lucide-react';
import { encodeData } from 'utils/compressionUtils';

const SaveButton = (props: { onOpenSnack: () => void }) => {
	const { onOpenSnack } = props;
	const selectedShows = useGetSelectedShow();

	const router = useRouter();
	const url = useLocation();

	const handleClick = async () => {
		const encodedShows = encodeData(selectedShows);

		try {
			await navigator.clipboard.writeText(`${url?.host}${url?.pathname}#${encodedShows}`); // copy to clipboard
			if (encodedShows !== '' || url?.hash.substring(1) !== '') {
				router.push(`${url?.pathname}#${encodedShows}`);
			}
			onOpenSnack();
		} catch (error) {
			console.error('Could not copy text: ', error);
		}
	};

	return (
		<ShadowIconButton aria-label="share" onClick={handleClick}>
			<Share />
		</ShadowIconButton>
	);
};

export default SaveButton;
