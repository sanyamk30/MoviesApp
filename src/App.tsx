/** @jsxImportSource @emotion/react */
// @ts-nocheck
import NavBar from './components/NavBar';
import { Global, css } from '@emotion/react';
import { createContext, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { useDebounce } from './CustomHooks';
import axiosClient from './ApiClient';
import { TOTAL_PAGES } from './constants';

export const AppContext = createContext<any>(null);

function App() {
	const [myMovies, setMyMovies] = useState(JSON.parse(localStorage.getItem('myMovies')) || []);
	const [searchInput, setSearchInput] = useState('');
	const [movies, setMovies] = useState<any[]>([]);
	const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);
	const [pageNum, setPageNum] = useState(1);
	const [loading, setLoading] = useState(false);

	const debouncedSearchInput = useDebounce(searchInput);

	const filterFromMyMovies = (movie: any) => {
		const IsPresent = myMovies.filter((mov) => mov.imdbID === movie.imdbID).length > 0;

		let newMovies;
		if (IsPresent) {
			newMovies = myMovies.filter((mov) => mov.imdbID !== movie.imdbID);
		} else {
			newMovies = [...myMovies, movie];
		}
		setMyMovies(newMovies);

		localStorage.setItem('myMovies', JSON.stringify(newMovies));
	};

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

	return (
		<ErrorBoundary fallback={<p css={{ textAlign: 'center' }}>Something went wrong</p>}>
			<AppContext.Provider value={{ movies, myMovies, filterFromMyMovies, setSearchInput, loading, pageNum, setLastElement }}>
				<Global
					styles={css`
						body {
							background: #141414;
							color: #ffffff;
							width: 100%;
							height: 100vh;
						}
						#root {
							height: 100%;
						}
					`}
				></Global>
				<div css={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
					<NavBar></NavBar>
					<div css={{ overflowY: 'auto' }}>
						<Outlet />
					</div>
				</div>
			</AppContext.Provider>
		</ErrorBoundary>
	);
}

export default App;
