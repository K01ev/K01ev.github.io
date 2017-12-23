var DEAD = 0,
	ALIVE = 1,
	CELL_X_COUNT = 60,
	CELL_Y_COUNT = 60,
	TIMEOUT = 100,
	interval;
	
function createUniverse() {
	var universe = document.getElementById('universe');
	for(var i = 0; i < CELL_X_COUNT;i++) {
		for(var j = 0; j < CELL_Y_COUNT;j++) {
		    var element = document.createElement('div');

			element.className = 'divCell';
			element.style.left = (i * 11) + 'px';		
			element.style.top = (j * 11) + 'px';
			element.id = "x" + i + "y" + j;
			element.setAttribute("state", DEAD);
			universe.appendChild(element);
		}
	}
}

function cellClick(event) {
	if(event.target.tagName == "DIV")	{
		if(event.target.getAttribute("state") == DEAD) {
			event.target.setAttribute("state", ALIVE);
			event.target.style.background = "green";
		}
		else {
			event.target.setAttribute("state", DEAD);
			event.target.style.background = "white"
		}
		
	}
    event.stopPropagation();
}

function getCellState(x, y)
{
	if( x < 0 || x >= CELL_X_COUNT || y < 0 || y >= CELL_Y_COUNT)	{
		return null;
	}
	
	var cell = document.getElementById("x" + x + "y" + y);
	return cell.getAttribute("state");
}

function setCellState(x, y, deadOrAlive){	

	if( x < 0 || x >= CELL_X_COUNT || y < 0 || y >= CELL_Y_COUNT)	{
		return;
	}
		
	var cell = document.getElementById("x" + x + "y" + y);
	cell.setAttribute("state", deadOrAlive);
	
	cell.style.background = 
		deadOrAlive == DEAD ? "white" : "green";
}

function lifeStep() {
	var stateOnNextStep = [];
	for(var i = 0; i < CELL_X_COUNT; i++) 
		stateOnNextStep[i] = [];
	for(var i = 0; i < CELL_X_COUNT; i++) {
		for(var j = 0; j < CELL_Y_COUNT; j++) {
			var count = countAliveNeighbours(i, j);
			//alert(i +" " + j + " " + count);
			if (getCellState(i, j) == ALIVE) {
				if ((count >= 2) && (count < 4))
					stateOnNextStep[i][j] = ALIVE;
				else 
					stateOnNextStep[i][j] = DEAD;
			}
			else {
				if (count ===3)
					stateOnNextStep[i][j] = ALIVE;
				else 
					stateOnNextStep[i][j] = DEAD;
			}
		}
	}
	for(var i = 0; i < CELL_X_COUNT; i++) {
		for(var j = 0; j < CELL_Y_COUNT; j++) {
			setCellState(i, j, stateOnNextStep[i][j]);
		}
	}
}
	
function countAliveNeighbours(x, y){
	var count = - parseInt(getCellState(x ,y));
	for (var i = x - 1; i <= x + 1; i++) {
		for (var j = y - 1; j <= y + 1; j++) {
			var aX = (CELL_X_COUNT + i) % CELL_X_COUNT;
			var aY = (CELL_Y_COUNT + j) % CELL_Y_COUNT;
			count += parseInt(getCellState(aX, aY));
		}
	}
	return count;
}

function startLife() {
	var timeBetweenSteps = 1000 / parseFloat(document.getElementById("liveTime").value, 10);
	pauseLife();
	//alert(timeBetweenSteps);
	if (isNaN(timeBetweenSteps))
		interval = setInterval(lifeStep, TIMEOUT);
	else {
		interval = setInterval(lifeStep, timeBetweenSteps);
		TIMEOUT = timeBetweenSteps;
	}
	
}

function pauseLife() {
	clearInterval(interval);
}

function killLife() {
	pauseLife();	
	for(var i = 0; i < CELL_X_COUNT; i++) {
			for(var j = 0; j < CELL_Y_COUNT; j++) {
				setCellState(i, j, DEAD);
		}
	}
}
	
function stepLife() {
	pauseLife();
	lifeStep();
}
