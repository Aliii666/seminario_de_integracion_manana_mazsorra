" ENTEROS, cADENA DE CARACTERES, bOOLEANOS, NONE"
marca="Toyota Corolla" # string
kilometraje= 120000 # int
precio_servicio= 125.50 # float
taller_abierto=True # boolean
nulo= None # NoneType

print(type(marca))
print(type(kilometraje))
print(type(precio_servicio))
print(type(taller_abierto))
print(type(nulo))

#Asignar valor varias variables en una linea
precio1, precio2, precio3= 80, 150, 200
print(precio1)
print(precio2)
print(precio3)

# Asignar el mismo valor a varias variables
precio1= precio2 = precio3 = 100
print(precio1)
print(precio2)
print(precio3)

#Intercambiar valores
servicio_a, servicio_b= 45, 120
print(servicio_a, servicio_b)
servicio_a, servicio_b= servicio_b, servicio_a
print(servicio_a, servicio_b)

#Convenciones de nombres
nombre_mecanico_completo= "Carlos García" # snake_case
nombreMecanico= "Carlos García" # NO USAR camelCase
MAX_SERVICIOS_DIARIOS=20 # MAYUSCULAS SOSTENIDAS PARA CONSTANTES
_referencia_interna= "REF_001" # para uso interno

#Manejo de Enteros
pequeno = 45
negativo = -150
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
