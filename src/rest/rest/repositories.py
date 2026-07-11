class TodoRepository:
    def __init__(self, database):
        self._col = database["todos"]

    def get_all(self):
        todos = []
        for doc in self._col.find():
            todos.append({"id": str(doc["_id"]), "description": doc["description"]})
        return todos

    def create(self, description):
        result = self._col.insert_one({"description": description})
        return {"id": str(result.inserted_id), "description": description}
