import { mount, route } from 'navi';

const routes = mount({
	'/musicFest': mount({
		'/': route({
			title: `Forex`,
			getView: () =>
				import(
					/*webpackChunkName: "MainPage"*/
					'../views/Timetable'
				),
		}),
		// '/otc': mount({
		// 	'/': route({
		// 		title: `OTC`,
		// 		getView: () =>
		// 			import(
		// 				/*webpackChunkName: "OtcPage"*/
		// 				'../views/Otc'
		// 			),
		// 	}),
		// }),
		'/links': route({
			title: `Profile`,
			getView: () =>
				import(
					/*webpackChunkName: "ProfilePage"*/
					'../views/Links'
				),
		}),
	}),
});

export default routes;
