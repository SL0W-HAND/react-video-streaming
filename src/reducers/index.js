const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_FAVORITE':
			if (state.favList.some((item) => item._id === action.payload._id)) {
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
					(items) => items._id !== action.payload
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
