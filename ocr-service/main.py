from fastapi import Depends, FastAPI
from app.controller import authCheckController
from security.jwtService import require_jwt


app = FastAPI(dependencies=[Depends(require_jwt)])
app.include_router(authCheckController.router)
