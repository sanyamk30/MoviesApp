/** @jsxImportSource @emotion/react */
//@ts-nocheck
import React from 'react';
// import { AppContext } from '../App';
import MovieCard from '../components/MovieCard';

const MyMovieList = () => {
	const myMovies = JSON.parse(localStorage.getItem('myMovies'));

	return myMovies.length > 0 ? (
		<div
			css={{
				display: 'grid',
				gridTemplateColumns: 'repeat(3,1fr)',
				gridGap: '16px',
				margin: '16px auto'
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
