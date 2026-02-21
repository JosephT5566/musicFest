import { redirect } from 'next/navigation';
import { ROUTE } from 'constants/static';

export default function Home() {
	redirect(ROUTE.megaport['2026'].root);
	return null;
}
