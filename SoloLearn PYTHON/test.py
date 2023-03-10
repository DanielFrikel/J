#38. Introducir 12 valores A y 10 de B. Calcular la suma de los valores A, la de los B y la suma de los productos AB.
# Pedir al usuario que ingrese 12 valores para A
print("Ingrese 12 valores para A: ")
A = [float(input()) for _ in range(12)]


# Pedir al usuario que ingrese 10 valores para B
print("Ingrese 10 valores para B: ")
B = [float(input()) for _ in range(10)]


# Calcular la suma de los valores de A
for i in A:
    sumaA = sumaA + i
sumaA = sum(A)

# Calcular la suma de los valores de B
sumaB = sum(B)

# Calcular la suma de los productos AB
sumaAB = sum([A[i] * B[i] for i in range(10)])

# Imprimir los resultados
print("La suma de los valores de A es: ", sumaA)
print("La suma de los valores de B es: ", sumaB)
print("La suma de los productos AB es: ", sumaAB)


# ---------------------------------------------------------------------------

# TypeError                                 Traceback (most recent call last)

# <ipython-input-29-a824098e26f8> in <module>
#      11 
#      12 # Calcular la suma de los valores de A
# ---> 13 sumaA = sum(A)
#      14 
#      15 # Calcular la suma de los valores de B

# TypeError: 'list' object is not callable
#el error comentadio anteriormente
#se soluciona con la siguiente linea









