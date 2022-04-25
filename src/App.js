import React from 'react';
import './App.css';
import Game from './components/Game';
import Help from './components/Help';

function App() {
	return (
		<div className='App'>
			<header>
				<Help />
				<h1 className='title'>Tic-Tac-Toe</h1>
			</header>
			<Game />
			<footer>&copy; 2022 Tanwa Sripan</footer>
		</div>
	);
}

export default App;
