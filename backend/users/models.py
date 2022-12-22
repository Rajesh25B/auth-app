from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.

class UserManager(BaseUserManager):
    '''A custom manager class that extends basic features of BaseUserManager 
    and overrides a couple of methods to handle creating user and superuser.
    '''
    def create_user(
        self,
        first_name,
        last_name,
        email,
        phone_number,
        password=None
    ):
        """
        Creates and saves a User with the 
        given email, first_name, last_name, phone-no and password.
        """
        if not email:
            raise ValueError('Users must have an email address.')
        
        if not phone_number:
            raise ValueError('Users must have a valid phone-number')
        
        email = normalize_email(email)
        email = email.lower()
        
        user = self.model(
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone_number=phone_number
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """creates and saves a superuser"""
        user = self.create_user(email, phone_number, password=password)
        user.is_staff = True
        user.is_superuser = True
        user.save()

        return user


class User(AbstractBaseUser):
    first_name = models.CharField(max_length=129)
    last_name = models.CharField(max_length=129)
    email = models.EmailField(
        verbose_name='email address',
        max_length=129,
        unique=True,
    )
    phone_number = models.PositiveBigIntegerField()
    joined_on = models.DateField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=False)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone_number']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True
