print("Listas")
print("Crear listas")
vacia=[]
print(vacia)
precios=[45,80,120,200,150,100]
print(precios)
mecanicos=["Carlos", "Luis", "Pedro", "Juan","Ana","Maria"]
print(mecanicos)
mixta=[1, "Toyota", "Corolla", True, None, 125.50]
print(mixta)
aninada=[1,[80,150,[45,60,75]],200,300]
print(aninada)
print("Acceder a elementos de la lista")
print(mecanicos[0])
print(mecanicos[-1])
print(mecanicos[1:3]) 
print(mecanicos[::-1])

print("CRUD en listas")
repuestos=["Filtro aceite","Pastillas freno","Amortiguadores","Bujias"]
#agregar
repuestos.append("Correas")
print(repuestos)
repuestos.insert(1, "Aceite 5W-30")
print(repuestos)
repuestos.extend(["Mangueras", "Cables"])
#modificar
repuestos[0]="Filtro aire"
print(repuestos)
#eliminar elementos
repuestos.remove("Bujias")
print(repuestos)
eliminado=repuestos.pop()
print(repuestos)
eliminado=repuestos.pop(0)
print(repuestos)
del repuestos[0]
print(repuestos)


print("buscar valores en los elementos de una lista")
print("Mangueras" in repuestos)
print(repuestos.index("Mangueras"))
print(repuestos.count("Mangueras"))

print("ordenar listas")
precios_desordenados=[150,80,250,45,120,95,200,75,180,100,110]
print(precios_desordenados)
precios_desordenados.sort()
print(precios_desordenados)
precios_desordenados.sort(reverse=True)
print(precios_desordenados)
ordenada=sorted(precios_desordenados)
print(precios_desordenados)
print(ordenada)
