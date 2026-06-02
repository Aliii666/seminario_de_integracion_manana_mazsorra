print("Ciclo for")
repuestos=["Filtro de aceite","Pastillas de freno","Amortiguadores","Bujías",]
for repuesto in repuestos:
    print(repuesto)
print("Recorrer palabras")
for letra in "taller":
    print(letra)

print("Recorrer rango")
for i in range(1,10,2):
    print(i)

print("Enumerar lista")
for i in enumerate(repuestos):
    print(i)

print("Dos listas a la vez")
mecanicos=["Carlos","Luis","Pedro",]
precios=[80,120]
for mecanico,precio in zip(mecanicos,precios):
    print(mecanico,precio)

print("Control del Ciclo")
print("Break")
for i in range(5):
    if i==6:
        break
    print(i)
print("Continue")
for i in range(5):
    if i==2:
        continue
    print(i)

print("For anidado")
for i in range(3):
    for j in range(2):
        print(i,j)
print("Lista comprehension forma corta")
precios_dobles=[x*2 for x in range(5)]
print(precios_dobles)
