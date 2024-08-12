
import psycopg2
from psycopg2 import OperationalError
from db_queries import CREATE_TABLE_QUERY, GET_ALL_DOCS_QUERY

class DbConnection:
    __connection = False

    def mapColumns(self, col):
        return {
            "id": col[0],
            "title": col[1], 
            "position": col[2],
            "type": col[3],
            "thumbnail": col[4]
        }

    def get_connection(self):
        return self.__connection
    
    def execute_query(self, query):
        self.__connection.autocommit = True
        cursor = self.__connection.cursor()
        try:
            cursor.execute(query)
            print("Query executed successfully")
        except OperationalError as e:
            print(f"The error '{e}' occurred")
    
    def create_table(self):
        self.execute_query(CREATE_TABLE_QUERY)

    def insert_default_data(self):
        docs = [
            ("Bank Draft", 0, "bank-draft", "https://randomuser.me/api/portraits/lego/7.jpg"),
            ("Bill Of Landing", 1, "bill-of-landing", "https://randomuser.me/api/portraits/lego/6.jpg"),
            ("Invoice", 2, "invoice", "https://randomuser.me/api/portraits/lego/0.jpg"),
            ("Bank Draft 2", 3, "bank-draft-2", "https://randomuser.me/api/portraits/lego/2.jpg"),
            ("Bill Of Landing 2", 4, "bill-of-landing-2", "https://randomuser.me/api/portraits/lego/8.jpg"),
        ]

        doc_records = ", ".join(map(str, docs))
        insert_query = (
            f"INSERT INTO docs (title, position, type, thumbnail) VALUES {doc_records}"
        )
        self.execute_query(insert_query)

    def execute_read_query(self, query):
        cursor = self.__connection.cursor()
        try:
            cursor.execute(query)
            result = cursor.fetchall()
            return result
        except OperationalError as e:
            print(f"The error '{e}' occurred")
            return None
        
    def get_all_docs(self):
        docs = self.execute_read_query(GET_ALL_DOCS_QUERY)
        mappedDocs = list(map(self.mapColumns, docs))
        return mappedDocs

    def connect(self):
        try:
            self.__connection = psycopg2.connect(
                database="postgres",
                user="postgres",
                password="S3cret",
                host="db",
                port=5432,
                # host="localhost",
                # port=5432,
            )
            print("Connection to the PostgreSQL established successfully.")
        except OperationalError as e:
            print("Connection to the PostgreSQL encountered and error.")
            print(f"The error '{e}' occurred")
        
dbConnection = DbConnection()
