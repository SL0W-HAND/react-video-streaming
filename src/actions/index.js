export const setFavorite = (payload) => ({
	type: 'SET_FAVORITE',
	payload,
});

export const deleateFavorite = (payload) => ({
	type: 'DELEATE_FAVORITE',
	payload,
});

export const setAuthenticated = (payload) => ({
	type: 'AUTHENTICATED',
	payload,
});
