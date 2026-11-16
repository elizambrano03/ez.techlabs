from django.urls import path
from .views import ContactLeadCreateView

urlpatterns = [
    path('submit/', ContactLeadCreateView.as_view(), name='contact-submit'),
]

