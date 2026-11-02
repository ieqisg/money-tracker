from fastapi import Depends, FastAPI
from app.controller import authCheckController
from app.controller import receiptController
from service.jwtService import require_jwt


# app = FastAPI(dependencies=[Depends(require_jwt)])
app = FastAPI()
app.include_router(authCheckController.router)
app.include_router(receiptController.router)


@app.get("/health")
def health():
    return {"status": "ok"}
