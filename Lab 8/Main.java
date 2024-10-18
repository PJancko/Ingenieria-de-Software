import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        // Imprimir tu nombre al inicio
        System.out.println("Jancko Gallardo Pablo Alejandro");

        List<Integer> numeros = generateRandomNumbers();
        ViewCondition view = new ViewCondition();

        view.show("TODOS", numeros, new AllwaysTrue());
        view.show("PARES", numeros, new MultipleCondition(2));
        view.show("IMPARES", numeros, new NotCondition(new MultipleCondition(2)));
        view.show("MULTIPLOS DE 5", numeros, new MultipleCondition(5));
        view.show("MULTIPLOS DE 3", numeros, new MultipleCondition(3));
        view.show("NO MULTIPLOS DE 5", numeros, new NotCondition(new MultipleCondition(5)));
        view.show("PRIMOS", numeros, new PrimeCondition());
        view.show("MES DE UN ANIO", numeros, new IsYear());
        
        // Mostrar los múltiplos de 4
        view.show("MULTIPLOS DE 4", numeros, new MultipleCondition(4));
        
        // Mostrar múltiplos de 3 y 4
        view.show("MULTIPLOS DE 3 Y 4", numeros, new AndCondition(new MultipleCondition(3), new MultipleCondition(4)));
    }

    public static List<Integer> generateRandomNumbers() {
        List<Integer> randomNumbers = new ArrayList<>();
        Random random = new Random();
        for (int i = 0; i < 20; i++) {
            randomNumbers.add(random.nextInt(100));
        }
        return randomNumbers;
    }
}

interface ICondicion {
    boolean evaluate(int x);
}

class IsYear implements ICondicion {
    public boolean evaluate(int x) {
        return x >= 1 && x <= 12;
    }
}

class OrCondition implements ICondicion {
    private ICondicion condicionA;
    private ICondicion condicionB;

    public OrCondition(ICondicion condicion1, ICondicion condicion2) {
        this.condicionA = condicion1;
        this.condicionB = condicion2;
    }

    public boolean evaluate(int x) {
        return condicionA.evaluate(x) || condicionB.evaluate(x);
    }
}

// Nueva clase AndCondition para evaluar ambas condiciones
class AndCondition implements ICondicion {
    private ICondicion condicionA;
    private ICondicion condicionB;

    public AndCondition(ICondicion condicion1, ICondicion condicion2) {
        this.condicionA = condicion1;
        this.condicionB = condicion2;
    }

    public boolean evaluate(int x) {
        return condicionA.evaluate(x) && condicionB.evaluate(x);
    }
}

class MultipleCondition implements ICondicion {
    private int number;

    public MultipleCondition(int num) {
        this.number = num;
    }

    public boolean evaluate(int x) {
        return x % number == 0;
    }
}

class PrimeCondition implements ICondicion {
    public boolean evaluate(int x) {
        if (x <= 1) return false;
        for (int i = 2; i <= x / 2; i++) {
            if (x % i == 0) return false;
        }
        return true;
    }
}

class AllwaysTrue implements ICondicion {
    public boolean evaluate(int x) {
        return true;
    }
}

class NotCondition implements ICondicion {
    ICondicion _condicionOriginal;

    public NotCondition(ICondicion original) {
        this._condicionOriginal = original;
    }

    public boolean evaluate(int x) {
        return !_condicionOriginal.evaluate(x);
    }
}

class ViewCondition {
    public void show(String mensaje, List<Integer> datos, ICondicion condicion) {
        System.out.println(mensaje);
        for (int i : datos) {
            if (condicion.evaluate(i)) {
                System.out.print(i + " ");
            }
        }
        System.out.println();
    }
}