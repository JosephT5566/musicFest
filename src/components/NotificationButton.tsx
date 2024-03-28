import { useEffect, useState } from 'react';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { ShadowIconButton } from 'components/base/Button';

import { useOpenSnackbar } from 'providers/SnackbarProvider';

const NotificationButton = () => {
	const [permissionState, setPermissionState] = useState('default');

	const openSnackbar = useOpenSnackbar();

	useEffect(() => {
		if ('Notification' in window) {
			Notification.requestPermission((status) => {
				console.log(status);
				setPermissionState(status);
			});
		}
	}, []);

	const handleClick = () => {
		switch (permissionState) {
			case 'denied':
				openSnackbar('warning', '通知未開啟，請至設定修改。');
				break;
			case 'granted':
				openSnackbar('success', '通知已開啟，將在表演開始前30分鐘通知。');
				break;
			default:
				break;
		}
	};

	return 'Notification' in window ? (
		<ShadowIconButton aria-label="notification" onClick={handleClick}>
			{permissionState === 'denied' ? <NotificationsOffIcon /> : <NotificationsActiveIcon />}
		</ShadowIconButton>
	) : null;
};

export default NotificationButton;
