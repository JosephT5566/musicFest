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
		// '/profile': route({
		// 	title: `Profile`,
		// 	getView: () =>
		// 		import(
		// 			/*webpackChunkName: "ProfilePage"*/
		// 			'../views/Profile'
		// 		),
		// }),
	}),
});

export default routes;
