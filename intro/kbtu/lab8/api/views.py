from django.http import JsonResponse
from django.views.decorators.http import require_GET
from .models import Product, Category


def product_to_dict(product):
    return {
        'id': product.id,
        'name': product.name,
        'price': product.price,
        'description': product.description,
        'count': product.count,
        'is_active': product.is_active,
        'category_id': product.category_id,
    }


def category_to_dict(category):
    return {
        'id': category.id,
        'name': category.name,
    }


@require_GET
def products_list(request):
    products = Product.objects.all()
    return JsonResponse([product_to_dict(p) for p in products], safe=False)


@require_GET
def product_detail(request, id):
    try:
        product = Product.objects.get(id=id)
    except Product.DoesNotExist:
        return JsonResponse({'error': 'Product not found'}, status=404)
    return JsonResponse(product_to_dict(product))


@require_GET
def categories_list(request):
    categories = Category.objects.all()
    return JsonResponse([category_to_dict(c) for c in categories], safe=False)


@require_GET
def category_detail(request, id):
    try:
        category = Category.objects.get(id=id)
    except Category.DoesNotExist:
        return JsonResponse({'error': 'Category not found'}, status=404)
    return JsonResponse(category_to_dict(category))


@require_GET
def category_products(request, id):
    try:
        category = Category.objects.get(id=id)
    except Category.DoesNotExist:
        return JsonResponse({'error': 'Category not found'}, status=404)
    products = category.products.all()
    return JsonResponse([product_to_dict(p) for p in products], safe=False)
