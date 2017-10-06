#3 * 3 Matrix
import random
a = [0,1,2,3,4,5,6,7,8]

def chooseFromSample(aList):
    chosen = random.sample(aList ,  1)[0];
    aList.remove(chosen);
    return chosen;
    
twoD = [ [chooseFromSample(a) for j in range(3)] for i in range(3) ]

#asserted
def findZero(aList):
    '''
    @param aList is square matrix
    '''
    for row in range( len(aList) ):
        for col in range( len(aList) ):
            if aList[row][col] == 0:
                return (row , col)

#Asserted
def isSorted(aList):
    '''
    true if twoD array is aligned
    '''
    count = 1
    lastElement = len(aList)**2#last element in 3*3 Matrix is 9 ... our aList wont have 9
    
    for i in aList:
        for j in i:
            if (j != count) and (count != lastElement):
                return False
            count+=1
    return True

    
def prettyPrint(aList):
    for i in aList:
        print("", end= "| ");
        for j in i:
            print(j , end = " | ")
        print();
        
def up(row , col, aList):
    
    lastRow = len(aList) - 1
    if row == lastRow:
        pass
    else:
        aList[row][col] = aList[row+1][col]
        row = row+1
        aList[row][col] = 0
    return row , col
        


def down(row , col, aList):
    if row == 0:
        pass
    else:
        aList[row][col] = aList[row-1][col]
        row = row-1
        aList[row][col] = 0
    return row , col
        
    

def right(row , col, aList):

    if col == 0:
        pass
    else:
        aList[row][col] = aList[row][col-1]
        col = col - 1
        aList[row][col] = 0
    return row, col

        
        
    
def left(row , col, aList):

    lastCol = len(aList) - 1
    if col == lastCol:
        pass
    else:
        aList[row][col] = aList[row][col+1]
        col = col + 1
        aList[row][col] = 0
    return row, col


flag = True
row,col = findZero(twoD); #index of zero in twoD array
size = len(twoD);
prettyPrint(twoD);

while flag:        
    inp = input("press key")

    if inp == "w":
        row,col = up( row,col, twoD );
        
    if inp == "s":
        row,col = down( row,col, twoD );

    if inp == "a":
        row,col = left( row,col, twoD );

    if inp == "d":
        row,col = right( row,col, twoD );

    prettyPrint(twoD);
    

