"""personalwebsite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView
#from mywebsite.views import HomeView




urlpatterns = [
    url(r'^admin/', admin.site.urls),
    #url(r'^admin/$', include(admin.site.urls) ),
    #url(r'admin/$', admin.site.urls),
    #path('blog/', include('mywebsite.urls')),
    #url(r'^home/', HomeView.as_view()),
    url(r'^home/$', TemplateView.as_view(template_name='home.html')),
    url(r'^$', TemplateView.as_view(template_name='home.html')),
    url(r'^contact/$', TemplateView.as_view(template_name='contact.html')),
    url(r'^about/$', TemplateView.as_view(template_name='about.html')),
    #url(r'^blog/$', TemplateView.as_view(template_name='blog.html')),
    url(r'^nerf_turret/$', TemplateView.as_view(template_name='nerf_turret.html')),
    url(r'^drink_dispenser/$', TemplateView.as_view(template_name='drink_dispenser.html')),
    url(r'^2p_snake_game/$', TemplateView.as_view(template_name='2p_snake_game.html')),
    url(r'^blog/', include("posts.urls", namespace='posts')),
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
