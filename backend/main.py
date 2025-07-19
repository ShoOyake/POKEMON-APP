# WebAPIを簡単に作れるフレームワーク
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

# FastAPI application instance
app = FastAPI()

# Root endpoint
@app.get("/")
def read_root():
    return {"Hello": "World"}

# Endpoint to read an item by its ID
@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}


#POSTの練習その１
class Item(BaseModel):
    item: str = "test"
    item_id: int = None

@app.post("/items/")
def create_item(item: Item):
    return {"item": item.item, "item_id": item.item_id} 


#POSTの練習その２
class Item(BaseModel):
    item_id: int
    item_name: str
    item_quantity: int

class Cart(BaseModel):
    items: List[Item]= []

@app.post("/cart/")
def analyse_cart(cart: Cart):
    total_item_types = len(cart.items)
    total_quantity = sum(i.item_quantity for i in cart.items)
    includes_apple = any(i.item_name == "apple" for i in cart.items)
    return {
        "total_item_types": total_item_types,
        "total_quantity": total_quantity,
        "includes_apple": includes_apple,
        "items": [i.dict() for i in cart.items]
    }
