/** @jsxImportSource @emotion/react */
//@ts-nocheck
import { useContext, useMemo } from 'react';
import { AppContext } from '../App';

type MovieDetail = {
	Title: string;
	Year: string;
	Rated: string;
	Released: string;
	Runtime: string;
	Genre: string;
	Director: string;
	Writer: string;
	Actors: string;
	Plot: string;
	Language: string;
	Country: string;
	Awards: string;
	Poster: string;
	Ratings: Rating[];
	Metascore: string;
	imdbRating: string;
	imdbVotes: string;
	imdbID: string;
	Type: string;
	DVD: string;
	BoxOffice: string;
	Production: string;
	Website: string;
	Response: string;
};

type Rating = {
	Source: string;
	Value: string;
};

type MovieDetailsCardProps = {
	movieDetail: MovieDetail;
};

const MovieDetailsCard = (props: MovieDetailsCardProps) => {
	const { movieDetail } = props;
	const { Title, Year, Actors, Country, Director, Genre, Plot, Poster, Writer, imdbRating, imdbVotes, imdbID, Type } = movieDetail;

	const { myMovies, filterFromMyMovies } = useContext(AppContext);

	const isPresent = useMemo(() => {
		return myMovies.filter((movie) => movie.imdbID === imdbID).length > 0;
	}, [myMovies, imdbID]);

	const handleClick = () => {
		filterFromMyMovies({ Title, Year, Poster, Type, imdbID });
	};

	return (
		<div
			css={{
				display: 'flex',
				flexDirection: 'row',
				margin: '24px',
				padding: '16px',
				justifyContent: 'space-between'
			}}
		>
			<div
				css={{
					height: '700px',
					width: '500px',
					border: '1px solid #ccc'
				}}
			>
				<img
					src={Poster}
					alt={Title}
					css={{
						objectFit: 'contain',
						height: '700px',
						width: '500px'
					}}
				/>
			</div>

			<div
				css={{
					display: 'flex',
					flexDirection: 'column',
					flexGrow: 1,
					marginLeft: '24px',
					padding: '16px'
				}}
			>
				<h2
					css={{
						fontSize: '24px'
					}}
				>
					{Title}
				</h2>

				<p
					css={{
						fontSize: '16px'
					}}
				>
					Year : {Year}
				</p>
				<p
					css={{
						fontSize: '16px'
					}}
				>
					Actors : {Actors}
				</p>
				<p
					css={{
						fontSize: '16px'
					}}
				>
					Country : {Country}
				</p>
				<p
					css={{
						fontSize: '16px'
					}}
				>
					Director : {Director}
				</p>
				<p
					css={{
						fontSize: '16px'
					}}
				>
					Genre : {Genre}
				</p>
				<p
					css={{
						fontSize: '16px'
					}}
				>
					Plot : {Plot}
				</p>
				<p
					css={{
						fontSize: '16px'
					}}
				>
					Writer : {Writer}
				</p>
				<p
					css={{
						fontSize: '16px'
					}}
				>
					IMDB Rating : {imdbRating}
				</p>
				<p
					css={{
						fontSize: '16px'
					}}
				>
					IMDB Votes : {imdbVotes}
				</p>

				<button
					css={{
						backgroundColor: '##fff',
						borderRadius: '4px',
						padding: '8px 16px',
						boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
						alignSelf: 'flex-start'
					}}
					onClick={handleClick}
				>
					{!isPresent ? 'Add to My List' : 'Remove from my List'}
				</button>
			</div>
		</div>
	);
};

export default MovieDetailsCard;
