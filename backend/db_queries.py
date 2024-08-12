CREATE_TABLE_QUERY = """
CREATE TABLE IF NOT EXISTS docs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL, 
  position INTEGER,
  type TEXT,
  thumbnail TEXT
)
"""

GET_ALL_DOCS_QUERY = """
SELECT * FROM docs
"""