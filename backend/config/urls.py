from django.contrib import admin
from django.urls import path, include
from apps.users.views import UserListView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("apps.users.urls")),
    path("api/posts/", include("apps.posts.urls")),
    path("api/users/", UserListView.as_view(), name="user-list-root"),
]
