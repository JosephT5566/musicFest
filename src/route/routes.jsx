import { mount, route } from 'navi';

const routes = mount({
	'/musicFest': mount({
		'/': route({
			title: `Time Table`,
			getView: () =>
				import(
					/*webpackChunkName: "MainPage"*/
					'../views/Timetable'
				),
		}),
		'/timeline': route({
			title: `Time Line`,
			getView: () =>
				import(
					/*webpackChunkName: "OtcPage"*/
					'../views/Timeline'
				),
		}),
		'/links': route({
			title: `Links`,
			getView: () =>
				import(
					/*webpackChunkName: "ProfilePage"*/
					'../views/Links'
				),
		}),
	}),
});

export default routes;
