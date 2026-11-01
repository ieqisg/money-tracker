from fastapi import APIRouter
from dotenv import load_dotenv
from pydantic import BaseModel
import os

from security.jwtService import validate_jwt

load_dotenv()
router = APIRouter()


class tite(BaseModel):
    payload: str


JWT_SECRET = os.getenv("JWT_SECRET")


@router.get("/authcheck")
def hello_world(request: tite):
    result = validate_jwt(request.payload)
    return {
        "valid": True,
        "user_id": result["sub"],
        "email": result.get("email")
    }
