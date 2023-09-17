/** @jsxImportSource @emotion/react */
//@ts-nocheck
import { useContext } from 'react';
import { routes } from '../routes';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

const navItems = [
	{
		label: 'Movies List',
		route: routes.movieList
	},
	{
		label: 'My Movies List',
		route: routes.myMovieList
	}
];

const NavBar = () => {
	const { searchInput, setSearchInput } = useContext(AppContext);

	const handleInputChange = (event) => {
		setSearchInput(event.target.value);
	};

	return (
		<div
			css={{
				display: 'flex',
				flexDirection: 'row',
				padding: '16px',
				justifyContent: 'space-between',
				alignItems: 'center'
			}}
		>
			<nav css={{ display: 'flex', flexDirection: 'row' }}>
				{navItems.map((item, index) => (
					<li css={{ marginRight: '8px', padding: '8px', listStyle: 'none' }} key={index}>
						<Link to={item.route} css={{ color: '#fff', textDecoration: 'none' }}>
							{item.label}
						</Link>
					</li>
				))}
			</nav>

			<div>
				<input placeholder="Search" value={searchInput} onChange={handleInputChange} />
			</div>
		</div>
	);
};

export default NavBar;
