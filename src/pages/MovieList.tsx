/** @jsxImportSource @emotion/react */
//@ts-nocheck

import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import axiosClient from '../ApiClient';
import MovieCard from '../components/MovieCard';
import { AppContext } from '../App';
import { debounce } from '../utils';
import { useDebounce } from '../CustomHooks';

const TOTAL_PAGES = 100;

const MovieList = () => {
	const [loading, setLoading] = useState(true);
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

	const fetchMovies = useCallback(async () => {
		setLoading(true);
		const response = await axiosClient.get('', {
			params: {
				s: searchInput,
				page: pageNum
			}
		});
		const tempMovies = response.data.Search;
		if (tempMovies) setMovies((prev) => [...prev, ...tempMovies]);
		setLoading(false);
	}, [pageNum, searchInput]);

	useEffect(() => {
		setMovies([]);
		setPageNum(1);
	}, [searchInput]);

	useEffect(() => {
		if (pageNum <= TOTAL_PAGES) debounce(fetchMovies, 500)();
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

	return (
		<div
			css={{
				display: 'grid',
				gridTemplateColumns: 'repeat(3,1fr)',
				gridGap: '16px',
				margin: 'auto'
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

			{loading && <p css={{ textAlign: 'center' }}>Loading...</p>}
		</div>
	);
};

export default MovieList;
