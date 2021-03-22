import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { GApageView } from '../../../src';

export default function Map() {
	useEffect(() => {
		GApageView(window.location.hostname + window.location.pathname);
	}, []);

	return <div>Map</div>;
}
