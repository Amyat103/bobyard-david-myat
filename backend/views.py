from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Comment
from .serializer import CommentSerializer
from rest_framework.response import Response

# Create your views here.
@api_view(["GET"])
def showAllComments(request):
    """
    Return all comments from DB
    """
    comments = Comment.objects.all()
    serialized = CommentSerializer(comments, many=True) #many - for serializing multiple objects
    return Response(serialized.data)

@api_view(["POST"])
def postComment(request):
    """
    Add a comment to DB
    """
    serialized = CommentSerializer(data=request.data)
    if serialized.is_valid():
        serialized.save() # save to DB
        return Response("Comment successfully added")
    return Response(serialized.errors)

@api_view(["PUT"])
def editComment(request, pk):
    """
    Edit comment in DB
    """
    comment = Comment.objects.get(pk=pk)
    serialized = CommentSerializer(comment, data=request.data)
    if serialized.is_valid():
        serialized.save()
        return Response("Edit Successful")
    return Response("Edit fail, try again")

@api_view(["DELETE"])
def deleteComment(request, pk):
    """
    Delete Comment
    """
    comment = Comment.objects.get(pk=pk)
    comment.delete()
    return Response("Comment Deleted")
