print("match-case")
comando = input("comando proceso iniciar/parar/reiniciar: ")
match comando:
    case "iniciar":
        print("sistema iniciado")
    case "parar":
        print("sistema detenido")
    case "reiniciar":
        print("sistema reiniciado")
    case _:
        print(f"comando '{comando}' no encontrado")


    print("match condiciones")
    numero=7
    match numero:
        case n if n<0:
            print(f"{n} es negativo")
        case 0:
            print("Es cero")
        case n if n%2==0:
            print(f"{n} es par")
        case n:
            print(f"{n} es positivo eimpar")

