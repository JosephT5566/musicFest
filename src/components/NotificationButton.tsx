import { useEffect, useState } from 'react';
import { Bell, BellOff} from 'lucide-react';
import { ShadowIconButton } from 'components/base/Button';
import { toast } from 'sonner';

const NotificationButton = () => {
	const [permissionState, setPermissionState] = useState('default');

	useEffect(() => {
		if ('Notification' in window) {
			setPermissionState(Notification.permission);
		}
	}, []);

	const handleClick = () => {
		switch (permissionState) {
			case 'denied':
				toast.warning('通知未開啟，請至設定修改。');
				break;
			case 'granted':
				toast.success('通知已開啟，將在表演開始前30分鐘通知。');
				break;
			default:
				break;
		}
	};

	return (
		<ShadowIconButton aria-label="notification" onClick={handleClick}>
			{permissionState === 'denied' ? <BellOff /> : <Bell />}
		</ShadowIconButton>
	);
};

export default NotificationButton;
