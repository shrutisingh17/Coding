import java.util.Scanner;
import java.util.ArrayList;

class Medium {
     public static ArrayList<Integer> findMoreLess(int[][] matrix) {
         
        ArrayList<Integer> list = new ArrayList<Integer>();
        
        for (int i = 0; i < matrix.length; i++) {
            int maxInRow = Integer.MIN_VALUE;
            int colIndex = -1;
            
            for (int j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] > maxInRow) {
                    maxInRow = matrix[i][j];
                    colIndex = j;
                }
            }
            boolean found = true;
            
            for (int k = 0; k < matrix.length; k++) {
                if (matrix[k][colIndex] < maxInRow) {
                    found = false;
                    break;
                }
            }
            if (found) {
                list.add(maxInRow);
            }
        }
        return list;
    }
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int rows = scanner.nextInt();
        int columns = scanner.nextInt();
        int[][] matrix = new int[rows][columns];
        
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                matrix[i][j] = scanner.nextInt();
            }
        }
        System.out.println(findMoreLess(matrix));
    }
}
