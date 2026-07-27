contador=1
while (contador<=5):
    print(f"Vehículo: {contador}")
    contador+=1

print("continue")
i=1
while(contador<=5):
    i+=1
    if i==3:
        continue
    print(f"Servicio: {i}")

print("break")
i=1
while(contador<=5):
    i+=1
    if i==3:
        break
    print(f"Servicio: {i}")

precio=int(input("Ingrese un precio: "))
while precio!=0:
    print("Precio ingresado: ", precio)
    precio=int(input("Ingrese un precio: "))

contador=1
while (contador<=5):
    print(f"Cliente: {contador}")
    contador+=1
else:
    print("Fin del ciclo")

contador=1
while (contador<=5):
    print(f"Trabajo: {contador}")
    contador+=1
    if contador==3:
        break
else:
    print("Fin del ciclo")
