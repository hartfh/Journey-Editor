

const TILE_PX_WIDTH = 40;
const TILE_PX_HEIGHT = 40;

const MAP_TILE_WIDTH = 40;
const MAP_TILE_HEIGHT = 26;

const MAP_PX_WIDTH = TILE_PX_WIDTH * MAP_TILE_WIDTH;
const MAP_PX_HEIGHT = TILE_PX_HEIGHT * MAP_TILE_HEIGHT;


const appContainer = document.getElementById('app-container');
const headerElem = document.createElement('div');
const bodyElem = document.createElement('div');
const sidebarElem = document.createElement('div');

headerElem.id = 'app-header';
bodyElem.id = 'app-body';
sidebarElem.id = 'app-sidebar';

appContainer.appendChild(headerElem);
appContainer.appendChild(bodyElem);
appContainer.appendChild(sidebarElem);

const Sidebar = (function(selfElem) {
	let self = {};

	self.init = function(tileOptions = []) {
		createChoices(tileOptions);
	}

	function createChoices(tiles = []) {
		tiles.forEach(function(tile) {
			let tileElem = document.createElement('div');

			selfElem.appendChild(tileElem);

			tileElem.classList.add('tile');

			// attach event handler
		});
	}

	return self;
}(sidebarElem));

const Body = (function(selfElem) {
	const canvas	= document.createElement('canvas');
	const context	= canvas.getContext('2d', {antialias: false});

	let dragging = false;
	

	canvas.id		= 'canvas';
	canvas.width	= MAP_PX_WIDTH + MAP_TILE_WIDTH;
	canvas.height	= MAP_PX_HEIGHT + MAP_TILE_HEIGHT;

	selfElem.appendChild(canvas);

	const canvasPos	= {x: canvas.offsetLeft, y: canvas.offsetTop};

	var self = {};

	self.render = function(mapData) {
		context.fillStyle = '#e780b3';
		context.fillRect(0, 0, canvas.width, canvas.height);

		for(let x = 0; x < MAP_TILE_WIDTH; x++) {
			for(let y = 0; y < MAP_TILE_HEIGHT; y++) {
				let baseCoords = {x: x * TILE_PX_WIDTH + x, y: y * TILE_PX_HEIGHT + y};
				//let index = (y * MAP_TILE_WIDTH) + x;
				//let data = mapData[index];
				context.fillStyle = (Math.random() > 0.5) ? '#756df5' : '#65e873';
				context.fillRect(baseCoords.x, baseCoords.y, TILE_PX_WIDTH, TILE_PX_HEIGHT);

				
			}
		}
	};

	function replaceTileHander(e) {
		let clickCoords = {
			x:	e.x - canvasPos.x,
			y:	e.y - canvasPos.y,
		};

		console.log(clickCoords);
	}

	function init() {
		canvas.addEventListener('click', replaceTileHander);
		canvas.addEventListener('mousedown', function() {
			dragging = true;
		});
		canvas.addEventListener('mouseup', function() {
			dragging = false;
		});
		canvas.addEventListener('mouseleave', function() {
			dragging = false;
		});
		canvas.addEventListener('mousemove', function(e) {
			if( dragging ) {
				replaceTileHander(e);
			}
		});
	}

	init();

	return self;
}(bodyElem));

Sidebar.init( Array(12).fill(false) );
Body.render();
