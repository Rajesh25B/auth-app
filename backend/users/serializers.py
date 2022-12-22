from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from rest_framework import serializers


User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'password'
        )
    
    # override ModelSerializer
    def create(self, validated_data):
        # create the user 
        # bcoz in views the hashed pwd gets returned when we create a new user
        # validated_data contains py native datatypes stored in a dict.
        user = User.objects.create_user(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            password=validated_data['password'],
            
        )
        return user
    
    # implement custom validation on the model level
    def validate(self, data):
        '''
        Validate method checks whether the pwd meets all validator requirements.
        If password is valid, return `None`
        If password is invalid, raise ValidationError with all error msgs.
        
        '''
        user = User(**data)
        password = data.get('password')
        
        try:
            validate_password(password, user)
        except exceptions.ValidationError as e:
            serilaizer_errors = serializer.as_serializer_error(e)
            raise exceptions.ValidationError(
                {'password': serilaizer_errors['non_field_errors']}
            )
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'phone_number')
