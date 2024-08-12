from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route
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

routes = [
    Route('/', homepage),
    Route('/docs', getAllDocs),
]

app = Starlette(debug=True, routes=routes, on_startup=[startup])