import java.util.Scanner;
import java.util.ArrayList;

class Hard {
    public static int countFishes(int K, int L, int M, int N, int total) {
        int hitCount = 0;

        for (int fishNumber = 1; fishNumber <= total; fishNumber++) {
            if (fishNumber % K == 0 || fishNumber % L == 0 || fishNumber % M == 0 || fishNumber % N == 0) {
                hitCount++;
            }
        }
        return hitCount;
    }

    public static void main(String[] args) {

        Scannner sc = new Scanner(System.in);

        int K = sc.nextInt();
        int L = sc.nextInt()
        int M = sc.nextInt();
        int N = sc.nextInt();
        int total = sc.nextInt();

        int result = countFishes(K, L, M, N, total);
        System.out.println(result);
    }
}
