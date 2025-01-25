from fastapi import Request, FastAPI
from .models import generator

app = FastAPI()

@app.post("/")
async def ask_question(request: Request):
    data = await request.json()
    return generator(data["question"])