print('Funciones de python')
print('Funcion basica')

def bienvenida():
    print('Bienvenido al Taller La Rueda')

bienvenida()


print('Funcion con parametros')
def saludar_mecanico(nombre):
    print(f'Hola: {nombre} que tal?')

saludar_mecanico('Carlos')
saludar_mecanico('Luis')

print('Funcion que devuelve valor con return')
def calcular_total(mano_obra, repuestos):
    return mano_obra + repuestos

print(calcular_total(80,150))

print('Funcion con valor por posicion')
def registrar_vehiculo(marca, ano, placa):
    print(f'{marca},{ano}, {placa}')
registrar_vehiculo('Toyota', 2022, 'ABC1234')  #por posicion
registrar_vehiculo(placa= 'XYZ9876', marca='Nissan', ano=2023) #por nombre

print('Funcion con valor por defecto')
def generar_presupuesto(servicio, precio=50, descuento=0):
    print(f'{servicio}, {precio} {descuento}')
generar_presupuesto('Cambio aceite' , 45, 10)  #por posicion
generar_presupuesto("Frenos", descuento=5)
generar_presupuesto("Alineacion", 80)



print('Funcion parametros posicionales')
def sumar_servicios(*precios):
    print(f"argumentos recibidos: {precios}")
    return sum(precios)

print(sumar_servicios(45,80,120))
print(sumar_servicios(200,150,300,50,100))
print(sumar_servicios(100,200,250))


print('Funcion parametros combinados con posicional')
def listar_repuestos(categoria,*repuestos):
    print(f"argumentos recibidos: {categoria}, {repuestos}")
    print(categoria)
    for repuesto in repuestos:
        print(f"  - {repuesto}")
    
listar_repuestos("Filtros","de aceite", "de aire", "de combustible", "de polen")

print('Funcion parametros con clave valor variables')
def crear_ficha_vehiculo(**kwargs):
    print(f"argumentos recibidos: {kwargs}")
    for clave,valor in kwargs.items():
        print(f" {clave}: {valor}")
    
crear_ficha_vehiculo(marca="Toyota", modelo="Corolla",ano=2022 ,placa="ABC1234")


print("Funcion parametros combinacion de todos los tipos")
def configurar_servicio(nombre, *mecanicos, descuento=False, **detalles):
    print(f"Nombre: {nombre}")
    print(f"Mecanicos: {mecanicos}")
    print(f"Descuento: {descuento}")
    print(f"Detalles: {detalles}")

configurar_servicio("Cambio aceite", "Carlos", "Luis", descuento=True, precio=45, duracion=30)

print("Devolver multiples valores")
def minmax_precios(precios):
    return min(precios), max(precios)

minimo, maximo = minmax_precios([45,120,80,200,150])
print(f"El precio máximo es: {maximo}, el precio mínimo es: {minimo}")
_, maximo = minmax_precios([100,250,300,200,150])
print(f"Solo maximo {maximo}")


print("Devolver un diccionario en el caso de muchos valores")
def analizar_precios(precios):
    total = sum(precios)
    n=len(precios)

    return {
        "total": total,
        "promedio": total/n if n >0 else 0,
        "minimo": min(precios) if precios else None,
        "maximo": max(precios) if precios else None,
        "cantidad": n
    }
datos = [45,150,80,200,120,100]
stats = analizar_precios(datos)
print(f"Total: {stats['total']}")
print(f"Promedio: {stats['promedio']:.2f}")
print(f"Rango: {stats['maximo'] - stats['minimo']}")

print("funciones lambda")

def doble_precio(x):
    return x*2
doble_lambda=lambda x: x*2
print(doble_precio(50))
print(doble_lambda(50))

sumar_precios=lambda a,b: a+b
print(sumar_precios(80,150))
