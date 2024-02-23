
import os
import django
os.environ.setdefault(
    'DJANGO_SETTINGS_MODULE', 'restaurant_server.settings')
django.setup()
from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
