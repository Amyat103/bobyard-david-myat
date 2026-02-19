from django.urls import path, include
from . import views

urlpatterns = [
    path("all_comments/", views.showAllComments),
    path("add_comment/", views.postComment),
    path("delete_comment/<int:pk>/", views.deleteComment),
    path("edit_comment/<int:pk>/", views.editComment),
]