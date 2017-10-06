
function getRandArr(size){      //--------------------ASSERTED ERROR FREE!!!--------------
  /**
  size is length of matrix
  if 3 X 3 matrix then size is 3
  */


  //if 3 X 3 matrix then 0 to 8 on the grid
  __size = size;//__size is editable

  //initializing arr from [ 0 .... (size*size-1)]
  count = -1;
  valuePool = Array( size * size ).fill(0).map(x=> { count+= 1; return count;});

  twoD = [];
  oneD = [];
  count = 0
  while (count < size * size){

      /**After removing elements for certain times, length of valuePool becomes lesser than param size
        So to prevent ArrayOutfBoundException..
      */
      if (valuePool.length < __size){
        __size -= 1;
      }

      /**selects either first second or third element from valuePool ..
        Random timeComplexity becomes O(n)
      */
      randIndex = Math.floor(Math.random() * __size);
      oneD.push( valuePool[randIndex] );

      //removing element from valuePool
      valuePool.splice(randIndex , 1);
      count += 1;

      //Making square Matrix so if columnLength == size push column
      if (oneD.length == size){
        twoD.push(oneD);
        oneD = [];
      }

  }

return twoD;

}




function initalizeTable(aList){   // TODO: MAke td dynamic for more than 3 X 3 matrix size
  //aList is the randomly generated array from getRandArr

  size = aList.length;
  tdList = document.getElementsByTagName("td");

  //removing prior innerHTML if any present
  //Necessary for NewGame
  for (var i = 0; i < tdList.length ; i++){
      tdList[i].innerHTML = "";
  }
  //

  for (var row = 0 ; row < size ; row++ ){

      for (var col = 0 ; col < size; col++){
            tdIndex = size*row + col;      //mapping 2d index of aList to 1d index of table
            elem = aList[row][col];
            if (elem != 0){
              tdList[tdIndex].innerHTML = aList[row][col];
            }
      }
  }

  return tdList;
}



function changeTable( row, col, prev_row , prev_col , tdList ){
    /*
    changes DOM
    4 params are the 2d index of the matrix we have to flat that into oneD array
    tdList is the list of table elements
    */
    twoDArrSize = Math.sqrt(tdList.length);
    newZeroIndex = twoDArrSize*row + col;
    oldZeroIndex =  twoDArrSize*prev_row + prev_col;

    tdList[oldZeroIndex].innerHTML = tdList[ newZeroIndex ].innerHTML;
    tdList[newZeroIndex].innerHTML = "";

}



var isSorted = function(aList){ //--------------------ASSERTED Bug FREE!!!--------------
/*
  returns true if twoD array is aligned
  **/
  lastElement = aList.length * aList.length;
  count = 1;

  for (var arr of aList){

      for(var each of arr){
            if ((each != count ) && (count != lastElement)){
                return false;
            }
            count += 1;
      }
  }
  return true;

}



var findZero = function(aList){
/*
position of 0 in 2d array it is main moving piece
*/
  for (var row = 0 ; row < aList.length ; row++){
      for (var col = 0 ; col < aList.length; col++){
          if (aList[row][col] == 0){
             return [row , col]
          }
      }
  }

}



var up = function(row , col , aList){
  var lastRow = aList.length - 1;

  if (row != lastRow){
    aList[row][col] = aList[row+1][col]
    row = row+1
    aList[row][col] = 0
  }
  return [row , col]
}

var down = function(row , col , aList){

    if (row!= 0){
      aList[row][col] = aList[row-1][col]
      row = row-1
      aList[row][col] = 0
    }
    return [row , col]
}

var right = function(row , col , aList){

    if ( col!= 0){
      aList[row][col] = aList[row][col-1];
      col = col - 1;
      aList[row][col] = 0;
    }

    return [row , col];
}

var left = function(row , col , aList){

    lastCol = aList.length - 1;

    if (lastCol != col){
        aList[row][col] = aList[row][col+1];
        col = col + 1;
        aList[row][col] = 0;
    }

    return [row , col];
}

// function __prettyPrint(aList){ //devCode --------------Asserted Bug Free
//     a = "";
//
//     for (var arr of aList){
//
//       for (var elem of arr){
//           a += elem;
//           a += "   |   ";
//       }
//       console.log("    "+a);
//       a = "";
//     }
// }
//


function wonGame(){
    var game = document.getElementById("game");
    game.style.display = "none";

    var winBanner = document.getElementById("winBanner");
    winBanner.style.display = "block";


}



function play(){
  twoD = getRandArr(3);
  tdList = initalizeTable(twoD);
  __prettyPrint(twoD);
  [row , col] = findZero(twoD); //zerothElement
  [prev_row , prev_col] = [row , col];//prev --> previous position of zero

//Synchronizing our DOM innerHTML with twoD array of numbers for better faster performance

    var arrowFunc = function(){
        [r , c] = [row , col];
        x = event.key;

        if (x == "ArrowUp" ){
            [r, c] = up(row , col , twoD);
        }

        if (x == "ArrowDown"  ){
            [r , c] = down(row , col , twoD);
        }

        if (x == "ArrowRight"){
            [r , c] = right(row , col , twoD);
        }

        if (x == "ArrowLeft" ){
            [r  , c] = left(row , col , twoD);
        }

        if (x == "s"){
          wonGame();
        }

        if (r != row || c != col){  //that means change occured
            [row , col] = [r , c];
            changeTable(row, col, prev_row , prev_col , tdList );                //change DOM
            prev_row = row ; prev_col = col;                //update prev_row , prev_col
            if (isSorted(twoD)){
               wonGame();
            }
        }

  }

  var gameWonFunc = function(){

         setTimeout( ()=>{ play() });

         document.getElementById("game").style.display = "block";
         document.getElementById("winBanner").style.display = "none";
         document.removeEventListener("keyup" ,arrowFunc);
         document.getElementById("newGame").removeEventListener("click" , gameWonFunc);//have to remove for preventing memory leak


  }


  document.addEventListener("keyup" , arrowFunc);
  document.getElementById("newGame").addEventListener("click", gameWonFunc);

}

play();
