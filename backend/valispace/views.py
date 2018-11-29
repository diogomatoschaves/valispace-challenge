from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
import re
import json
from .models import *

# Create your views here.

def index(request):

    return HttpResponse("Hello world")


@csrf_exempt
def add_function(request):

    if request.method == 'POST':

        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)

            function_name = body['name']
            function_expr = body['expression']

        except:
            return JsonResponse({'message': 'Data received is not valid', 'success': False}, safe=False)

        pattern = re.compile('[\w_-]+')
        if not pattern.match(function_name):
            return JsonResponse({'message': 'Function name is not valid', 'success': False}, safe=False)

        new_function = Functions.objects.create(name=function_name, expression=function_expr)

        return JsonResponse({'newFunction': dict(id=new_function.id,
                                                  name=new_function.name,
                                                  expression=new_function.expression), 'success': True}, safe=False)

    else:
        return JsonResponse({'message': 'Method not allowed', 'success': False}, safe=False)


@csrf_exempt
def return_functions(request):
    if request.method == 'GET':

        functions = Functions.objects.all().values()

        return JsonResponse({'functions': list(functions), 'success': True}, safe=False)

    else:
        return JsonResponse({'message': 'Method not allowed', 'success': False}, safe=False)


@csrf_exempt
def edit_function(request):

    if request.method == 'POST':

        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)

            function_id = body['id']
            function_name = body['name']
            function_expr = body['expression']

        except:
            return JsonResponse({'message': 'Data received is not valid', 'success': False}, safe=False)

        Functions.objects.filter(id=function_id).update(name=function_name, expression=function_expr)

        return JsonResponse({'message': 'function {} edited'.format(function_id), 'success': True}, safe=False)

    else:
        return JsonResponse({'message': 'Method not allowed', 'success': False}, safe=False)

def delete_function(request):

    if request.method == 'GET':

        function_id = request.GET['id']

        Functions.objects.filter(id=function_id).delete()

        return JsonResponse({'message': 'function {} deleted'.format(function_id), 'success': True}, safe=False)

    else:
        return JsonResponse({'message': 'Method not allowed', 'success': False}, safe=False)

