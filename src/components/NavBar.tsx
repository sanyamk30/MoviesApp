/** @jsxImportSource @emotion/react */
import { useContext } from 'react';
import { routes } from '../routes';
import { Link, useLocation } from 'react-router-dom';
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
	const location = useLocation();

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(event.target.value);
	};

	return (
		<div
			css={{
				display: 'flex',
				flexDirection: 'row',
				padding: '16px',
				justifyContent: 'space-between',
				alignItems: 'center',
				position: 'sticky',
				top: 0,
				left: 0,
				right: 0,
				zIndex: 1,
				boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
				backgroundColor: '#141414'
			}}
		>
			<nav css={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
				{navItems.map((item, index) => (
					<li
						css={{
							marginRight: '8px',
							padding: '8px',
							listStyle: 'none',
							':hover': { cursor: 'pointer' }
						}}
						key={index}
					>
						<Link
							to={item.route}
							css={{
								textDecoration: 'none',
								fontSize: '24px',
								fontWeight: 'bold',
								...(`/${item.route}` === location.pathname ? { color: 'red' } : { color: '#fff' })
							}}
						>
							{item.label}
						</Link>
					</li>
				))}
			</nav>

			{`/${navItems[0].route}` === location.pathname && (
				<div
					css={{
						display: 'flex',
						width: '50%',
						alignItems: 'center'
					}}
				>
					<input
						placeholder="Search"
						value={searchInput}
						onChange={handleInputChange}
						css={{
							width: '100%',
							padding: '8px',
							fontSize: '16px',
							borderRadius: '8px'
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default NavBar;
