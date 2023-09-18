/** @jsxImportSource @emotion/react */
//@ts-nocheck
import NavBar from './components/NavBar';
import { Global, css } from '@emotion/react';
import { createContext, useState } from 'react';

import { Outlet } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

export const AppContext = createContext<any>(null);

function App() {
	const [myMovies, setMyMovies] = useState(JSON.parse(localStorage.getItem('myMovies')) || []);
	const [searchInput, setSearchInput] = useState('');

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

	return (
		<ErrorBoundary fallback={<p css={{ textAlign: 'center' }}>Something went wrong</p>}>
			<AppContext.Provider value={{ myMovies, filterFromMyMovies, searchInput, setSearchInput }}>
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
