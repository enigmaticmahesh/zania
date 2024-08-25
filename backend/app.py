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

async def updateDocs(request):
    body = await request.json()
    try:
        if body['changes'] and bool(body['changes']):
            dbConnection.update_pos(body['changes'])

        return JSONResponse({'docs': 'Positions updated successfully'})
    except Exception as e:
        print("Error while updating docs: ", e)
        return JSONResponse({'error': 'Error while updating docs',}, status_code=400)

def startup():
    print('Server started')
    dbConnection.connect()
    dbConnection.create_table()
    dbConnection.insert_default_data()

middleware = [
    Middleware(CORSMiddleware, allow_origins=['*'], allow_methods=['*'])
]

routes = [
    Route('/', homepage),
    Route('/docs', getAllDocs),
    Route('/update-docs', updateDocs, methods=['PATCH']),
]

app = Starlette(debug=True, routes=routes, middleware=middleware, on_startup=[startup])