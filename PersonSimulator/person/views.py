from django.shortcuts import render

from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import redirect

import markovify

from Resources import config

#Populates with markov magic
if (len(config.file_path) > 0):
	with open(config.file_path, "r", encoding="utf-8") as file:
		text = file.read()
		text_model = markovify.Text(text)
else: 
	print("=-=-=-=-=-IMPORTANT-=-=-=-=-=")
	print("+++You MUST set the file path inside of Resources/config.py+++\n")
	text_model = markovify.Text("DEFAULT TEXT")

@login_required(login_url='/login/')
def index(request):
	if len(config.person_name) > 0:
		person_name = config.person_name
	else:
		person_name = "Person"
	
	context = {
		"person_name": person_name
	}
	
	return render(request, "templates/index.html", context)

def login(request):

	context = {
		"form": AuthenticationForm,
	}
	if request.method == "POST":
		username = request.POST['username']
		password = request.POST['password']
		user = authenticate(request, username=username, password=password)
		if user is not None:
			auth_login(request, user)
			
		return redirect("/")
	else:
		return render(request, "templates/login.html", context)
	
@csrf_exempt
def fetchSentence(request):	
	context = {
		"sentence" : text_model.make_short_sentence(250),
	}
	return JsonResponse(context)
