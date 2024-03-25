from celery import shared_task
import time
import datetime
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

# Définition d'une tâche Celery asynchrone
@shared_task
def send_periodic_msg():
    while True:
        print('Sending sms...')
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)('new_message', {'type': 'notify_client', 'message': f'email is sent.{datetime.datetime.now()}'})
        print('Message is sent.')
        time.sleep(5)  # Envoyer un message toutes les 5 secondes
