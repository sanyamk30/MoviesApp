/** @jsxImportSource @emotion/react */

import { useNavigate } from 'react-router';

type MovieCardProps = {
	movie: any;
};

const MovieCard = (props: MovieCardProps) => {
	const { movie } = props;
	const { Poster: poster, Title: title, Year: year, imdbID } = movie;

	const navigate = useNavigate();

	const handleClick = () => {
		const url = `/detail/${imdbID}`;
		navigate(url);
	};

	return (
		<div css={{ display: 'flex', flexDirection: 'column', height: '500px', width: '300px', justifyContent: 'space-between', cursor: 'pointer' }} onClick={handleClick}>
			<img src={poster} alt={title} css={{ objectFit: 'contain', height: '500px', width: '300px' }}></img>
			<h3>{`${title} (${year})`}</h3>
		</div>
	);
};

export default MovieCard;
