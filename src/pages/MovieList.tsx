/** @jsxImportSource @emotion/react */
//@ts-nocheck

import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import axiosClient from '../ApiClient';
import MovieCard from '../components/MovieCard';
import { AppContext } from '../App';
import { useDebounce } from '../CustomHooks';

const TOTAL_PAGES = 100;

const MovieList = () => {
	const [loading, setLoading] = useState(false);
	const [movies, setMovies] = useState<any[]>([]);
	const [pageNum, setPageNum] = useState(1);
	const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);

	const { myMovies, searchInput } = useContext(AppContext);
	const debouncedSearchInput = useDebounce(searchInput);

	const moviesToRender = useMemo(() => {
		const idsToFilter = myMovies.map((movie) => movie.imdbID);

		const filteredMovies = movies.filter((movie) => idsToFilter.includes(movie.imdbID) === false);

		return filteredMovies;
	}, [movies, myMovies]);

	const observer = useRef(
		new IntersectionObserver((entries) => {
			const first = entries[0];

			if (first.isIntersecting) {
				setPageNum((prev) => prev + 1);
			}
		})
	);

	useEffect(() => {
		setMovies([]);
		setPageNum(1);
	}, [debouncedSearchInput]);

	useEffect(() => {
		const fetchMovies = async () => {
			setLoading(true);
			const response = await axiosClient.get('', {
				params: {
					s: debouncedSearchInput,
					page: pageNum
				}
			});
			const tempMovies = response.data.Search;
			if (tempMovies) setMovies((prev) => [...prev, ...tempMovies]);
			setLoading(false);
		};

		if (pageNum <= TOTAL_PAGES && debouncedSearchInput !== '') fetchMovies();
	}, [pageNum, debouncedSearchInput]);

	useEffect(() => {
		const currentElement = lastElement;
		const currentObserver = observer.current;

		if (currentElement) {
			currentObserver.observe(currentElement);
		}

		return () => {
			if (currentElement) {
				currentObserver.unobserve(currentElement);
			}
		};
	}, [lastElement]);

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
