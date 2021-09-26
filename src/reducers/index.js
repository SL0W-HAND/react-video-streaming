const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_FAVORITE':
			if (state.favList.some((item) => item.id === action.payload.id)) {
				return state;
			} else {
				return {
					...state,
					favList: [...state.favList, action.payload],
				};
			}
		case 'DELEATE_FAVORITE':
			return {
				...state,
				favList: state.favList.filter(
					(items) => items.id !== action.payload
				),
			};
		case 'AUTHENTICATED':
			return {
				...state,
				auth: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
