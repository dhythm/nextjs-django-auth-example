import time

import jwt
from api.models import UserInfo
from jwtauth.settings import SECRET_KEY
from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication


class NormalAuthentication(BaseAuthentication):
    def authenticate(self, request):
        email = request._request.POST.get("email")
        password = request._request.POST.get("password")
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
    return jwt.encode(
        {"user_id": user.pk, "email": user.email, "info": user.info, "exp": timestamp},
        SECRET_KEY).decode("utf-8")

class JWTAuthentication(BaseAuthentication):
    keyword = 'JWT'
    model = None
    
    def authenticate(self, request):
        auth = get_authorization_header(request).split()
        
        if not auth or auth[0].lower() != self. keyword.lower().encode():
            return None
        
        if len(auth) == 1:
            msg = "Invalid Authorization"
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = "Invalid Authorization: no space"
            raise exceptions.AuthenticationFailed(msg)
        
        try:
            jwt_token = auth[1]
            jwt_info = jwt.decode(jwt_token, SECRET_KEY)
            userid = jwt_info.get("userid")
            try:
                user = UserInfo.objects.get(pk=userid)
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