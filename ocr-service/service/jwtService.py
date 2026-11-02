import os
import jwt

from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

JWT_SECRET = os.environ["JWT_SECRET"]

security = HTTPBearer()


def validate_jwt(token: str):
    try:
        payload = jwt.decode(
            token,
            JWT_SECRET,
            algorithms=["HS256"],
            options={
                "require": ["sub", "iat", "exp"]
            }
        )

        return payload

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=401,
            detail="JWT has expired"
        )

    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=401,
            detail="Invalid JWT")


def require_jwt(credentials: HTTPAuthorizationCredentials = Depends(security)):
    return validate_jwt(credentials.credentials)
