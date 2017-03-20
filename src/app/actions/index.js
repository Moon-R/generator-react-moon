export const GLOBAL_ACTION = 'GLOBAL_ACTION';

export function globalActionCreater(params) {
	return {
		type: GLOBAL_ACTION,
		params
	}
}