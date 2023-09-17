import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';
import MyMovieList from './pages/MyMovieList';
import { routes as appRoutes } from './routes';

const routes = createRoutesFromElements(
	<Route path="/" element={<App />}>
		<Route path={appRoutes.movieList} element={<MovieList />} index />

		<Route path={appRoutes.movieDetail} element={<MovieDetail />} index />

		<Route path={appRoutes.myMovieList} element={<MyMovieList />} index />

		<Route index element={<Navigate to={appRoutes.movieList} />}></Route>
	</Route>
);

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
