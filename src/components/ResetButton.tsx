import { useResetShows } from 'providers/ShowsProvider';

import { RotateCcw } from 'lucide-react';
import { ShadowIconButton } from 'components/base/Button';

const ResetButton = () => {
	const resetData = useResetShows();
	// const url = useLocation();

	const handleClick = () => {
		resetData();
		// window.history.pushState(null, '', `${url.pathname}`);
		// window.location.reload();
	};

	return (
		<ShadowIconButton aria-label="reset" onClick={handleClick}>
			<RotateCcw />
		</ShadowIconButton>
	);
};

export default ResetButton;