import { mount, route } from 'navi';

const routes = mount({
	'/musicFest': mount({
		'/': route({
			title: `Timetable`,
			getView: () =>
				import(
					/*webpackChunkName: "TimetablePage"*/
					'../views/Timetable'
				),
		}),
		'/timeline': route({
			title: `Timeline`,
			getView: () =>
				import(
					/*webpackChunkName: "TimelinePage"*/
					'../views/Timeline'
				),
		}),
		'/map': route({
			title: `Map`,
			getView: () =>
				import(
					/*webpackChunkName: "MapPage"*/
					'../views/Map'
				),
		}),
		'/links': route({
			title: `Links`,
			getView: () =>
				import(
					/*webpackChunkName: "LinksPage"*/
					'../views/Links'
				),
		}),
	}),
});

export default routes;
