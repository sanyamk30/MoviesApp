/** @jsxImportSource @emotion/react */
//@ts-nocheck

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axiosClient from '../ApiClient';

import MovieDetailsCard from '../components/MovieDetailsCard';

const MovieDetail = () => {
	const { id } = useParams();

	const [loading, setLoading] = useState(true);
	const [movieDetail, setMovieDetail] = useState(null);

	const fetchMovieById = useCallback(async () => {
		const response = await axiosClient.get('', {
			params: {
				i: id
			}
		});
		setMovieDetail(response.data);
		setLoading(false);
	}, [id]);

	useEffect(() => {
		fetchMovieById();
	}, [fetchMovieById]);

	return movieDetail && !loading ? (
		<div css={{ marginRight: 'auto' }}>
			<MovieDetailsCard movieDetail={movieDetail} />
		</div>
	) : (
		<p css={{ textAlign: 'center' }}>Loading...</p>
	);
};

export default MovieDetail;
