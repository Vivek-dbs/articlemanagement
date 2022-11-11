from typing import Union
import uvicorn
from fastapi import FastAPI,Request,File,UploadFile,Form
from fastapi.staticfiles import StaticFiles
import pymongo
from bson import ObjectId
import json
import time
app = FastAPI()
app.mount("/images", StaticFiles(directory="images"), name="images")

client = pymongo.MongoClient('localhost', 27017)
db = client["article"]

ip = "http://192.168.1.106"

@app.get("/")
def read_root():
    return "Welcome to book store"

@app.post("/admin/login")
async def adminLogin(request:Request):
    try:
        body = await request.json()
        check = db['admins'].find_one({"email" : body['email'],"password":body['password']})
        if check :
            return {"status" : True ,"message" : "Login success" ,"data":json.loads(json.dumps(check,default=str))}
        else:
            return {"status" : False ,"message" : "Wrong username or password" ,"data":{}}
    except Exception as e:
        return {"status" : False ,"message" : str(e) }

# @app.post("/admin/book")
# async def addBook(request:Request):
#     try:
#         body = await request.json()
#         db['books'].insert_one(body)
#         return {"status" : True ,"message" : "Book added" }
#     except Exception as e:
#         return {"status" : False ,"message" : "Something wrong"}

@app.post("/admin/article")
def fileupload(file:bytes = File(),name: str = Form(),author: str = Form(),description: str = Form()):
    try:
        path = "/images/"+str(int(time.time()))+".jpg"
        with open("."+path,"wb") as f:
            f.write(file)
            f.close()
        db['articles'].insert_one({"name":name,"author":author,"description":description,"image":path})
        return {"status":True,"message":"Article added"}
    except Exception as e:
        return {"status" : False ,"message" : str(e) }

@app.get("/admin/article")
def getBooks(request:Request):
    try:
        books = []
        get = list(db['articles'].aggregate([
            {
                '$project': {
                    'name': 1, 
                    'author': 1, 
                    'description': 1, 
                    'image': {
                        '$concat': [
                           ip,'$image'
                        ]
                    }
                }
            }
        ]))
        return {"status" : True ,"message" : "Article fetch success" ,"data" :json.loads(json.dumps(get,default=str))}
    except Exception as e:
        return {"status" : False ,"message" : str(e)}

@app.post("/admin/article/edit")
async def updateBook(request:Request):
    try:
        body = await request.json()
        db['articles'].update_one({"_id":ObjectId(body['_id'])},{"$set":{"name":body['name'],"author":body['author'],"description":body['description']}})
        return {"status" : True ,"message" : "Article updated" }
    except Exception as e:
        return {"status" : False ,"message" : str(e)}

@app.post("/user")
async def registerUser(request:Request):
    try:
        body = await request.json()
        db['users'].insert_one({"name":body['name'],"email":body['email'],"password":body['password'],"type":"user"})
        return {"status" : True ,"message" : "User registered" }
    except Exception as e:
        return {"status" : False ,"message" : str(e)}

@app.post("/user/login")
async def adminLogin(request:Request):
    try:
        body = await request.json()
        check = db['users'].find_one({"email" : body['email'],"password":body['password']})
        if check :
            return {"status" : True ,"message" : "Login success" ,"data":json.loads(json.dumps(check,default=str))}
        else:
            return {"status" : False ,"message" : "Wrong username or password" ,"data":{}}
    except Exception as e:
        return {"status" : False ,"message" : str(e) }

@app.post("/user/article/view")
async def adminLogin(request:Request):
    try:
        body = await request.json()
        db['article_views'].insert_one({"user_id":ObjectId(body['user_id']),"article":ObjectId(body['article_id'])})
        get = list(db['articles'].aggregate([
            {"$match":{"_id":ObjectId(body['article_id'])}},
            {
                '$project': {
                    'name': 1,
                    'author': 1,
                    'description': 1,
                    'image': {
                        '$concat': [
                            ip,'$image'
                        ]
                    }
                }
            }
            ]))
        return {"status":True,"data":json.loads(json.dumps(get,default=str))}
    except Exception as e:
        return {"status" : False ,"message" : str(e) }

@app.get("/user/dashboard")
async def adminLogin(request:Request):
    try:
        query = {}
        search = request.query_params.get('search')
        if search:
            query = {"$or":[{"name":{"$regex":search}},{"author":{"$regex":search}},{"description":{"$regex":search}}]}
        get = list (db['articles'].aggregate([
            {"$match":query},
            {
                '$lookup': {
                    'from': 'article_views', 
                    'localField': '_id', 
                    'foreignField': 'article', 
                    'as': 'result'
                }
            }, {
                '$project': {
                    'name': 1, 
                    'author': 1, 
                    'description': 1, 
                    'view_count': {
                        '$size': '$result'
                    },
                    'image': {
                        '$concat': [
                           ip,'$image'
                        ]
                    }
                }
            }, {
                '$sort': {
                    'view_count': -1
                }
            }
        ]))
        return {"status":True,"data":json.loads(json.dumps(get,default=str))}
    except Exception as e:
        return {"status" : False ,"message" : str(e) }


if __name__ == "__main__":
    uvicorn.run("main:app",host="0.0.0.0", port=80, reload=True)