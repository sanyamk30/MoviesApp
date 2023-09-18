import MovieCard from '../../components/MovieCard';
import { render, fireEvent } from '@testing-library/react';

test('should render correctly', () => {
	const mockMovie = {
		Poster: 'https://example.com/poster.jpg',
		Title: 'The Shawshank Redemption',
		Year: 1994,
		imdbID: 'tt0111161'
	};

	const { movieCard } = render(<MovieCard movie={mockMovie} />);

	expect(movieCard).toMatchSnapshot();
});

test('should navigate to the correct URL when clicked', () => {
	const mockMovie = {
		Poster: 'https://example.com/poster.jpg',
		Title: 'The Shawshank Redemption',
		Year: 1994,
		imdbID: 'tt0111161'
	};

	const mockNavigate = jest.fn();

	const { view } = render(<MovieCard movie={mockMovie} />);

	fireEvent.click(view.movieCard);

	expect(mockNavigate).toHaveBeenCalledWith('/detail/tt0111161');
});
