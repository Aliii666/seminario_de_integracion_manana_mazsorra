" ENTEROS, cADENA DE CARACTERES, bOOLEANOS, NONE"
nombre="Aliyha Mazsorra" # string
edad= 22 # int
estatura= 1.65 # float
acivo=True # boolean
nulo= None # NoneType

print(type(nombre))
print(type(edad))
print(type(estatura))
print(type(acivo))
print(type(nulo))

#Asignar valor varias variables en una linea
a, b, c= 12, 13, 14
print(a)
print(b)
print(c)

# Asignar el mismo valor a varias variables
a= b = c = 15
print(a)
print(b)
print(c)

#Intercambiar valores
x,y= 10, 20
print(x,y)
x,y= y,x
print(x,y)

#Convenciones de nombres
nombre_completo= "Aliyha Mazsorra" # snake_case
nombreCompleto= "Aliyha Mazsorra" # NO USAR camelCase
MAX_REINTENTOS=3 # MAYUSCULAS SOSTENIDAS PARA CONSTANTES
_variable_interna= "privada" # para uso interno

#Manejo de Enteros
pequeno = 42
negativo = -77
grande = 1_000_000_000
enorme= 2 ** 100

print(pequeno)
print(negativo)
print(grande)
print(enorme)

# Bases Numericas
binario= 0b1010 
octal= 0o17
hexadecimal= 0xFF
print(binario, octal, hexadecimal)
#convertir a decimal a otras bases
print(bin(255))
print(oct(255))
print(hex(255))
