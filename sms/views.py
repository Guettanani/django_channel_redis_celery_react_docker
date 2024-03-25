"""

import time
import datetime
from django.shortcuts import render, HttpResponse
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from sms.forms import MessageForm


# Create your views here.
def notification(request):
    return render(request, 'sms/notification.html', {'unread_count': 9})


def send_msg(request):
    if request.method == 'GET':
        return render(request, 'sms/send_msg.html', {'form': MessageForm()})
    elif request.method == 'POST':
        form = MessageForm(request.POST)
        if form.is_valid():
            print('Sending sms...')
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)('new_message', {'type': 'notify_client', 'message': f'email is sent.{datetime.datetime.now()}'})
            print('Message is sent.')
        else:
            print('Something is wrong')
            print(form.errors)
        return render(request, 'sms/send_msg.html', {'form': MessageForm()})
    else:
        return HttpResponse('Wrong method.')

"""

# Importation des modules et classes nécessaires
import time
import datetime
from django.shortcuts import render, HttpResponse
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from sms.forms import MessageForm

# Vue pour afficher la page de notification
def notification(request):
    # Renvoie la page HTML 'notification.html' avec une variable contextuelle 'unread_count' définie sur 9
    return render(request, 'sms/notification.html', {'unread_count': 9})

# Vue pour gérer l'envoi de messages
def send_msg(request):
    # Si la requête est de type GET
    if request.method == 'GET':
        # Renvoie la page HTML 'send_msg.html' avec un formulaire vide
        return render(request, 'sms/send_msg.html', {'form': MessageForm()})
    # Si la requête est de type POST
    elif request.method == 'POST':
        # Valide le formulaire de message
        form = MessageForm(request.POST)
        # Si le formulaire est valide
        if form.is_valid():
            # Affiche un message dans la console
            print('Sending sms...')
            # Obtient la couche de canal pour envoyer des messages via Django Channels
            channel_layer = get_channel_layer()
            # Envoie un message via le groupe 'new_message' avec un type 'notify_client' et un message contenant l'heure actuelle
            async_to_sync(channel_layer.group_send)('new_message', {'type': 'notify_client', 'message': f'email is sent.{datetime.datetime.now()}'})
            # Affiche un message dans la console indiquant que le message est envoyé
            print('Message is sent.')
        # Si le formulaire n'est pas valide
        else:
            # Affiche un message dans la console indiquant qu'il y a une erreur
            print('Something is wrong')
            # Affiche les erreurs du formulaire dans la console
            print(form.errors)
        # Renvoie la page HTML 'send_msg.html' avec le formulaire (vide ou avec des erreurs)
        return render(request, 'sms/send_msg.html', {'form': MessageForm()})
    # Si la méthode de requête n'est ni GET ni POST
    else:
        # Renvoie une réponse HTTP "Wrong method."
        return HttpResponse('Wrong method.')
# Vue pour envoyer des messages périodiquement
def send_periodic_msg(request):
    # Boucle infinie pour envoyer des messages toutes les 5 secondes
    while True:
        # Affiche un message dans la console
        print('Sending sms...')
        # Obtient la couche de canal pour envoyer des messages via Django Channels
        channel_layer = get_channel_layer()
        # Envoie un message via le groupe 'new_message' avec un type 'notify_client' et un message contenant l'heure actuelle
        async_to_sync(channel_layer.group_send)('new_message', {'type': 'notify_client', 'message': f'email is sent.{datetime.datetime.now()}'})
        # Affiche un message dans la console indiquant que le message est envoyé
        print('Message is sent.')
        # Pause de 5 secondes avant d'envoyer le prochain message
        time.sleep(5)

