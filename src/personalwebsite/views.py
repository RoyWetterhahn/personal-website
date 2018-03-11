import random
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views import View
from django.views.generic import TemplateView
# Create your views here.

class HomeView(TemplateView):
    template_name = 'home.html'

    def get_context_data(self, *args, **kwargs):
        context = super(HomeView, self).get_context_data(*args, **kwargs)
        num = None
        some_list = [
            random.randint(0, 100000000), 
            random.randint(0, 100000000), 
            random.randint(0, 100000000)
        ]
        condition_bool_item = True
        if condition_bool_item:
            num = random.randint(0, 100000000)
        context = {
            "num": num, 
            "some_list": some_list
        }
        return context
def about_page(request):
    context = {
        "title":"About Page",
        "content":" Welcome to the about page."
    }
    return render(request, "about_page.html", context)
def contact_page(request):
    context = {
        "title":"Contact",
        "content":" Welcome to the contact page.",}
    return render(request, "contact_page.html", context)


def home_page(request):
    context = {
        "title":"About Page",
        "content":" Welcome to the about page."
    }
    return render(request, "home_page.html", context)
def blog_page(request):
    context = {
        "title":"blog Page",
        "content":" Welcome to the about page."
    }
    return render(request, "blog_page.html", context)

# Create your views here.


def index(request):
    return render_to_response('index.html', {
        'categories': Category.objects.all(),
        'posts': Blog.objects.all()[:5]
    })

def view_post(request, slug):   
    return render_to_response('view_post.html', {
        'post': get_object_or_404(Blog, slug=slug)
    })

def view_category(request, slug):
    category = get_object_or_404(Category, slug=slug)
    return render_to_response('view_category.html', {
        'category': category,
        'posts': Blog.objects.filter(category=category)[:5]
    })









