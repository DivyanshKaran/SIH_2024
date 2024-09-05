import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# class Image(BaseModel):

@app.post('/predict')
