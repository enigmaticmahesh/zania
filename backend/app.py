from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from db import dbConnection

async def homepage(request):
    return JSONResponse({'hello': 'world'})

async def getAllDocs(request):
    docs = dbConnection.get_all_docs()
    return JSONResponse({'docs': docs})

def startup():
    print('Server started')
    dbConnection.connect()
    dbConnection.create_table()
    dbConnection.insert_default_data()

middleware = [
    Middleware(CORSMiddleware, allow_origins=['*'])
]

routes = [
    Route('/', homepage),
    Route('/docs', getAllDocs),
]

app = Starlette(debug=True, routes=routes, middleware=middleware, on_startup=[startup])