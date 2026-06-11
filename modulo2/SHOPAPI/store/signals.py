import logging
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.apps import apps
from store.models.order import Order

logger = logging.getLogger(__name__)


@receiver(post_save, sender=User)
def user_post_save(sender, instance, created, **kwargs):
    if created:
        # Intentar crear el perfil de forma dinámica si el modelo UserProfile existe
        try:
            UserProfile = apps.get_model('store', 'UserProfile')
            UserProfile.objects.create(user=instance)
        except (LookupError, ValueError):
            pass
        _send_welcome(instance)


def _send_welcome(user):
    """Envía correo de bienvenida. Falla en silencio para no bloquear el registro."""
    if not user.email:
        return
    try:
        from store.services.email import send_welcome_email
        send_welcome_email(user)
    except Exception:
        logger.exception('Error enviando correo de bienvenida a %s', user.email)


@receiver(post_save, sender=Order)
def order_post_save(sender, instance, created, **kwargs):
    if created:
        _send_order_confirmation(instance)


def _send_order_confirmation(order):
    """
    Envía correo de confirmación. Falla en silencio para no bloquear la transacción.
    """
    if not order.user.email:
        return
    try:
        from store.services.email import send_order_confirmation_email
        send_order_confirmation_email(order)
    except Exception:
        logger.exception('Error enviando confirmación de orden #%s', order.id)
