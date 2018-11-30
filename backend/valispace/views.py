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
            operator = body['operator']
            first_parameter_func = body['firstParamFunc']
            first_parameter_int = body['firstParamInt']
            second_parameter_func = body['secondParamFunc']
            second_parameter_int = body['secondParamInt']

            if first_parameter_func and int(first_parameter_func) and Functions.objects.filter(id=first_parameter_func).exists():
                first_parameter_func = Functions.objects.get(id=first_parameter_func)
                first_parameter_int = None
            else:
                first_parameter_int = int(first_parameter_int)
                first_parameter_func = None

            if second_parameter_func and int(second_parameter_func) and Functions.objects.filter(id=second_parameter_func).exists():
                second_parameter_func = Functions.objects.get(id=second_parameter_func)
                second_parameter_int = None
            else:
                second_parameter_int = int(second_parameter_int)
                second_parameter_func = None

        except:
            return JsonResponse({'message': 'Data received is not valid', 'success': False}, safe=False)

        pattern = re.compile(r'[\w_-]+')
        if not pattern.match(function_name):
            return JsonResponse({'message': 'Function name is not valid', 'success': False}, safe=False)

        new_function = Functions.objects.create(
            name=function_name,
            operator=operator,
            first_parameter_func=first_parameter_func,
            first_parameter_int=first_parameter_int,
            second_parameter_func=second_parameter_func,
            second_parameter_int=second_parameter_int
        )

        return JsonResponse({'newFunction': new_function.serialize, 'success': True}, safe=False)

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
            operator = body['operator']
            first_parameter_func = body['firstParamFunc']
            first_parameter_int = body['firstParamInt']
            second_parameter_func = body['secondParamFunc']
            second_parameter_int = body['secondParamInt']

            if Functions.objects.filter(id=first_parameter_func).exists():
                first_parameter_func = Functions.objects.get(id=first_parameter_func)
                first_parameter_int = None
            else:
                first_parameter_int = int(first_parameter_int)
                first_parameter_func = None

            if Functions.objects.filter(id=second_parameter_func).exists():
                second_parameter_func = Functions.objects.get(id=second_parameter_func)
                second_parameter_int = None
            else:
                second_parameter_int = int(second_parameter_int)
                second_parameter_func = None

        except:
            return JsonResponse({'message': 'Data received is not valid', 'success': False}, safe=False)

        Functions.objects.filter(id=function_id).update(name=function_name,
                                                        operator=operator,
                                                        first_parameter_func=first_parameter_func,
                                                        first_parameter_int=first_parameter_int,
                                                        second_parameter_func=second_parameter_func,
                                                        second_parameter_int=second_parameter_int)

        return JsonResponse({'message': 'function {} edited'.format(function_id), 'success': True}, safe=False)

    else:
        return JsonResponse({'message': 'Method not allowed', 'success': False}, safe=False)

@csrf_exempt
def delete_function(request):

    if request.method == 'GET':

        function_id = request.GET['id']

        Functions.objects.filter(id=function_id).delete()

        return JsonResponse({'message': 'function {} deleted'.format(function_id), 'success': True}, safe=False)

    else:
        return JsonResponse({'message': 'Method not allowed', 'success': False}, safe=False)


@csrf_exempt
def type_ahead(request):

    if request.method == 'GET':

        query = request.GET['query']

        results = Functions.objects.filter(name__icontains=query).values()

        return JsonResponse({'results': list(results), 'success': True}, safe=False)

    else:
        return JsonResponse({'message': 'Method not allowed', 'success': False}, safe=False)


@csrf_exempt
def calculate(request):
    if request.method == 'POST':

        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)

            terms = body['terms']

        except:
            return JsonResponse({'message': 'Data received is not valid', 'success': False}, safe=False)

        total_result = []
        for i, term in enumerate(terms):

            if i % 2 == 0:

                if type(term) is dict:
                    total_result.append(chain_linked_list(term['id']))

                else:
                    total_result.append(term)

            else:
                total_result.append(term)

        total_result = eval(' '.join([str(item) for item in total_result]))

        return JsonResponse({'message': 'The calculation was performed', 'result': total_result, 'success': True}, safe=False)

    else:
        return JsonResponse({'message': 'Method not allowed', 'success': False}, safe=False)


def chain_linked_list(node):

    function = Functions.objects.filter(id=node).values()[0]

    operator = function['operator']

    if function['first_parameter_int']:

        first_result = function['first_parameter_int']

    else:
        first_result = chain_linked_list(function['first_parameter_func_id'])

    if function['second_parameter_int']:

        second_result = function['second_parameter_int']

    else:
        second_result = chain_linked_list(function['second_parameter_func_id'])

    result = eval('{} {} {}'.format(first_result, operator, second_result))

    return result





