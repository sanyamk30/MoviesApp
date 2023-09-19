/** @jsxImportSource @emotion/react */
// @ts-nocheck

import { useContext, useMemo } from 'react';
import MovieCard from '../components/MovieCard';
import { AppContext } from '../App';
import { TOTAL_PAGES } from '../constants';

const MovieList = () => {
	const { myMovies, loading, pageNum, movies, setLastElement } = useContext(AppContext);

	const moviesToRender = useMemo(() => {
		const idsToFilter = myMovies.map((movie) => movie.imdbID);

		const filteredMovies = movies.filter((movie) => idsToFilter.includes(movie.imdbID) === false);

		return filteredMovies;
	}, [movies, myMovies]);

	return moviesToRender && moviesToRender.length > 0 ? (
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
			{moviesToRender.map((movie, index) => {
				return index !== movies.length - 1 && !loading && pageNum <= TOTAL_PAGES ? (
					<div key={index} ref={setLastElement}>
						<MovieCard key={index} movie={movie} />
					</div>
				) : (
					<MovieCard key={index} movie={movie} />
				);
			})}

			{loading && <p css={{ flex: 1, textAlign: 'center' }}>Loading...</p>}
		</div>
	) : (
		<div css={{ flex: 1, textAlign: 'center', verticalAlign: 'middle' }}>{loading ? 'Loading...' : 'No movies to show. Search to get started'}</div>
	);
};

export default MovieList;
