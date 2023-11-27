from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from tables.serializers import RestaurantTableSerializer
from tables.models import RestaurantTable

# CREATE TABLE ITEM


@api_view(['POST'])
def create_table(request):
    if request.method == 'POST':
        # Verify that the request data is a list
        if not isinstance(request.data, list):
            return Response({"error": "Data must be a list of tables"}, status=status.HTTP_400_BAD_REQUEST)

        for table_data in request.data:
            serializer = RestaurantTableSerializer(data=table_data)

            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=400)

        return Response({"message": "Table(s) created successfully!"}, status=201)


# GET ALL TABLES
@api_view(['GET'])
def list_tables(request):
    if request.method == 'GET':
        tables = RestaurantTable.objects.all()
        serializer = RestaurantTableSerializer(tables, many=True)
        return Response(serializer.data)

# DELETE TABLE


@api_view(['DELETE'])
def delete_table(request, table_id):
    if request.method == 'DELETE':
        table = RestaurantTable.objects.get(id=table_id)
        table.delete()
        return Response({"message": "Table deleted successfully!"}, status=202)
