import time

import jwt
from api.models import UserInfo
from jwtauth.settings import SECRET_KEY
from rest_framework import exceptions
from rest_framework.authentication import (BaseAuthentication,
                                           get_authorization_header)


class NormalAuthentication(BaseAuthentication):
    def authenticate(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user_obj = UserInfo.objects.filter(email=email).first()
        if not user_obj:
            raise exceptions.AuthenticationFailed('Authentication failed')
        elif user_obj.password != password:
            raise exceptions.AuthenticationFailed('Authentication failed')
        token = generate_jwt(user_obj)
        return (token, None)
    
    def authenticate_header(self, request):
        pass

def generate_jwt(user):
    timestamp = int(time.time()) + 60*60*24*7
    return jwt.encode({"user_id":user.pk,"email":user.email,"info":user.info,"exp":timestamp}, SECRET_KEY, algorithm="HS256")

class JWTAuthentication(BaseAuthentication):
    keyword = 'JWT'
    model = None
    
    def authenticate(self, request):
        auth = get_authorization_header(request)
        
        if not auth:
            return None
        
        try:
            jwt_token = auth.decode("utf-8")
            jwt_info = jwt.decode(jwt_token, SECRET_KEY, algorithms="HS256")
            user_id = jwt_info.get("user_id")
            try:
                user = UserInfo.objects.get(pk=user_id)
                user.is_authenticated = True
                return (user, jwt_token)
            except:
                msg = "Invalid input"
                raise exceptions.AuthenticationFailed(msg)
        except jwt.ExpiredSignatureError:
            msg = "Token expired"
            raise exceptions.AuthenticationFailed(msg)
        
    def authenticate_header(self, request):
        pass