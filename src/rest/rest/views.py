import logging
import os

from pymongo import MongoClient
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .repositories import TodoRepository

logger = logging.getLogger(__name__)

mongo_uri = "mongodb://" + os.environ["MONGO_HOST"] + ":" + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)["test_db"]


class TodoListView(APIView):
    """Handles listing (GET) and creating (POST) TODO items."""

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self._repository = TodoRepository(db)

    def get(self, request):
        try:
            todos = self._repository.get_all()
            return Response(todos, status=status.HTTP_200_OK)
        except Exception:
            logger.exception("Failed to fetch todos")
            return Response(
                {"error": "Failed to fetch todos."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def post(self, request):
        description = (request.data.get("description") or "").strip()
        if not description:
            return Response(
                {"error": "Description is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            todo = self._repository.create(description)
            return Response(todo, status=status.HTTP_201_CREATED)
        except Exception:
            logger.exception("Failed to create todo")
            return Response(
                {"error": "Failed to create todo."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
