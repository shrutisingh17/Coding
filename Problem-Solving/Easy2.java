//3. How many trails to 1?

import java.util.Scanner;

class Easy2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        
        System.out.println(noOfSteps(x));
    }
    public static int noOfSteps(int x){
        
        int steps = 0;
        
        while( x != 1){
            if(x % 2 == 0)
                x = x/2;
            else
                x = 3*x + 1;
            steps++;
        }
        return steps;
    }
}