

		$(function(){
			
			square = 12;
			scoreMax = 10;

			$('#score-max').text(scoreMax);


			usedCells = Array();


			init();

			function init(){

				createBoard();

				setLimits();

				placeThings();

				debug();

			}


			function placeThings(){

				placeRandomBlock(0);

				placeRandomDonut();
				
				placeRandomHomer();
			}

			$('#clear').click(function(){

				clear();
				placeThings();

			});


			$(document).keypress(function(e) {
				switch(e.keyCode) {
					case 37: moveLeft(); 
					break;

					case 38: moveUp();
					break;

					case 39: moveRight();
					break;

					case 40:moveDown();
					break;

					default: 
					break;
				}
			});


			function incrementScore(points){
				$('#score').text(parseInt($('#score').text()) + points);
			}	

			

			function setHomer(to, from, direction){

				var currentCellHomer = $('#cell-'+ from.toString());
				var nextCellHomer = $('#cell-'+ to.toString());
				var cellHomer =null;
				var flag = false;

				// if(! nextCellHomer.hasClass('block') && ! nextCellHomer.hasClass('wall') ){
					if(! nextCellHomer.hasClass('block')){

						if( ! currentCellHomer.hasClass('limit-left') && direction === "left"){
							flag = true;
						}else if( ! currentCellHomer.hasClass('limit-right') && direction === "right"){
							flag = true;
						}else if( ! currentCellHomer.hasClass('limit-up') && direction === "up"){
							flag = true;
						}else if( ! currentCellHomer.hasClass('limit-down') && direction === "down"){
							flag = true;
						}
					}


					if(flag === true){

						cellHomer = $('#cell-'+ to.toString());

						if(cellHomer.hasClass('donut')){
							incrementScore(1);
						}

						cellHomer.removeClass('donut');
						cellHomer.addClass('homer');
						cellHomer.attr('data-cell', to);

						$('#cell-' + to).addClass('homer');


						if('init' !== from){
							unsetHomer(from);
							$('#cell-' + from).addClass('wall');
							placeOneRandomBlock();
						}
					}

				}

				function setBlock(){

				}

				function unsetHomer(cell){
					var cellHomer = $('#cell-'+ cell.toString());

					cellHomer.removeClass('homer');
				}

			// MOVES FUNCTIONS -------------------------------------------------------
			// MOVES FUNCTIONS -------------------------------------------------------

			function moveLeft(){

				var to = $('.homer').data('cell') -1;
				var from = $('.homer').data('cell');
				setHomer(to, from, 'left');
			}
			function moveUp(){
				var to = $('.homer').data('cell') -square;
				var from = $('.homer').data('cell');
				setHomer(to, from, 'up');
			}
			function moveRight(){

				var to = $('.homer').data('cell') +1;
				var from = $('.homer').data('cell');
				setHomer(to, from, 'right');
			}
			function moveDown(){

				var to = $('.homer').data('cell') +square;
				var from = $('.homer').data('cell');
				setHomer(to, from, 'down');
			}
			// MOVES FUNCTIONS -------------------------------------------------------



			function placeRandomBlock(number){

				for (var i = 1; $('.block').length < number; i++) {

					var rand = 0;

					while(rand > square*square || rand < 1){
						rand = Math.floor(Math.random()*square);
					}

					cellRandBlock = $('#cell-'+ rand.toString());
					cellRandBlock.addClass('block');

					usedCells.push(rand);
				}

			}

			function placeOneRandomBlock(){

				
				var rand = 0;

				while(rand > square*square || rand < 1 || $('#cell-'+ rand.toString()).hasClass('block') || $('#cell-'+ rand.toString()).hasClass('donut') || $('#cell-'+ rand.toString()).hasClass('homer')){
					rand = Math.floor(Math.random()*square*square);
				}

				cellRandBlock = $('#cell-'+ rand.toString());
				cellRandBlock.addClass('block');

				usedCells.push(rand);
				

			}



			function placeRandomDonut(){

				for (var i = 1; $('.donut').length < scoreMax; i++) {

					rand = 0;

					// while OOB or used get another rand number
					while(rand > square*square || rand < 1 || $('#cell-'+ rand.toString()).hasClass('block')){
						rand = Math.floor(Math.random()*square*square);

					}

					cellrand = $('#cell-'+ rand.toString());
					cellrand.addClass('donut');

					usedCells.push(rand);
				}

			}

			function placeRandomHomer(){
				var rand = 0;
				// while rand is out of bounds
				while(rand > square*square || rand < 1 || $('#cell-'+ rand.toString()).hasClass('donut') || $('#cell-'+ rand.toString()).hasClass('block')){
					rand =  Math.floor(Math.random()*100);
				}

				var cellHomer = $('#cell-'+ rand.toString());

				cellHomer.addClass('homer');
				cellHomer.attr('data-cell', rand);
				
				usedCells.push(rand);

			}


			function createBoard(){

				var o = 1;

				//create the rows
				for (var i = 1; i <=square; i++) {

					var rowId = 'row-' + i;
					$('#board').append('<div class="row" id="' + rowId + '"></div>');

					//create the cells
					for (var a = 1; a<= square; a++) {
						$('#'+rowId).append('<div class="cell col-xs-1" id="cell-'+ o +'"></div>');
						o++;
					};

				}
			}

			function setLimits(){

				for (var i = 1; i <= square * square ; i+=square) {

					var cell = $('#cell-'  + i.toString());
					cell.addClass('limit-left');
				}
				for (var a = square; a <= square * square ; a+=square) {

					var cell = $('#cell-'  + a.toString());
					cell.addClass('limit-right');
				}
				for (var o = 1; o <= square; o++) {

					var cell = $('#cell-'  + o.toString());
					cell.addClass('limit-up');
				}
				for (var u = square*square; u >= square*square-square+1; u--) {

					var cell = $('#cell-'  + u.toString());
					cell.addClass('limit-down');
				}
			}


			function debug(){

				console.log('.donut = ' + $('.donut').length);
				console.log('.homer = ' + $('.homer').length);
				console.log('.block = ' + $('.block').length);
				console.log('.used = ' + usedCells.length);
				console.log('ERROR BLOCK AND DONUT = ' + $('.block.donut').length);

			}


			function clear(){

				$('.cell').each(function(){

					$(this).removeClass('homer');
					$(this).removeClass('block');
					$(this).removeClass('wall');
					$(this).removeClass('donut');

				});

				$('#score').text(0);
				$('#score-max').text(scoreMax);

			}


		});
