# framework imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

# local imports
from .serializers import UserCreateSerializer, UserSerializer

# Create your views here.


class RegisterUserView(APIView):
    def post(self, request):
        data = request.data
        # pass the data into serializer
        serializer = UserCreateSerializer(data=data)

        # check if the serializer data is valid
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # if validation passed then create the user
        # by calling the create method from serializer class and pass
        # validated_data
        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)
        return Response(user.data, status=status.HTTP_201_CREATED)


class RetrieveUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        user = UserSerializer(user)
        
        return Response(user.data, status=status.HTTP_200_OK)


# from django.contrib.auth import get_user_model
# User = get_user_model()

# we can create user here in views like below,
# but utilize the serializer to do some of the
# validation stuff like not displaying hashed password, invalid email

# class RegisterUserView(APIView):
#     def post(self, request):
#         data = request.data # incoming request has data in request.data
#         first_name = data['first_name']
#         last_name = data['last_name']
#         email = data['email']
#         phone_number = data['phone_number']
#         password = data['password']
        
#         # create the user based on custom user model and user manager method
#         user = User.objects.create_user(
#             first_name,
#             last_name,
#             email,
#             phone_number,
#             password
#         )
#         # serialize the data into primitive datatypes 
#         # before creating the Response object.
#         user = UserCreateSerializer(user)
        
#         return Response(user.data, status=status.HTTP_201_CREATED)
