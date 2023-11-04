import { useResetShows } from 'providers/ShowsProvider';

import ReplayIcon from '@mui/icons-material/Replay';
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
			<ReplayIcon />
		</ShadowIconButton>
	);
};

export default ResetButton;