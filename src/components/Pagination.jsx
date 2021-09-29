import React from 'react';

const Pagination = ({ currentPage, totalPages }) => {
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
