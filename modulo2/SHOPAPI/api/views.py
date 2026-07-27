# api/views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def saludo(request):
    """
    Endpoint más simple posible.
    GET /api/saludo/ → devuelve un JSON fijo.
    """
    datos = {
        "mensaje":  "¡Hola desde Django REST Framework!",
        "version":  "1.0",
        "estado":   "ok",
    }
    return Response(datos)
    # Response serializa el dict a JSON automáticamente
    # Status por defecto: 200 OK