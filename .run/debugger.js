createStore(rootReducer, compose(
	createDebugger(),
	applyMiddleware(...middlewares)
));
// createDebugger({
// 	isVisible:  true,
// 	allowServerLogging:  true,
// 	serverUrl:  'http://mydomain.com/log',
//   authorization: 'YWRtaW46U2VjcmV0MTIz', <--- DEFAULT HASH
// 	eventTypes: [
// 		{
// 			TYPE: 'NETWORK_REQUEST',
// 			CATEGORY_NAME: 'Network request logging',
// 			EVENT_NAME: 'Net. Request',
// 		},
// 	]
// })
Debugger.logAction({
	label: 'My event',
	type: 'NETWORK_REQUEST',
	logType: 'SUCCESS',
	data: myCustomData <-- Supported types: String, Array, Object
});
