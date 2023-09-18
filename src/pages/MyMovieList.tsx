/** @jsxImportSource @emotion/react */
//@ts-nocheck
import React from 'react';
// import { AppContext } from '../App';
import MovieCard from '../components/MovieCard';

const MyMovieList = () => {
	const myMovies = JSON.parse(localStorage.getItem('myMovies'));

	return myMovies && myMovies.length > 0 ? (
		<div
			css={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
				gridGap: '8px',

				'@media (max-width: 768px)': {
					gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))'
				}
			}}
		>
			{myMovies.map((movie, index) => (
				<MovieCard key={index} movie={movie} />
			))}
		</div>
	) : (
		<p css={{ textAlign: 'center' }}>No Movies in your list</p>
	);
};

export default MyMovieList;
