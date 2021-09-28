import React from 'react';
import { useHistory } from 'react-router';

const Pagination = ({ currentPage, totalPages }) => {
	const history = useHistory();
	const handleClick = (index) => {
		currentPage(index);
	};

	let pages = [];
	for (let i = 1; i <= totalPages || 4; i++) {
		pages.push(i);
	}
	console.log(pages);

	return (
		<ul>
			{pages.map((page) => {
				return (
					<li>

						<button
							onClick={() => {
								handleClick(page);
							}}
						>
							{page}
						</button>
					</li>
				);
			})}
		</ul>
	);
};

export default Pagination;
