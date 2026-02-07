from django.core.management.base import BaseCommand
from rumors.services import settle_rumor

class Command(BaseCommand):
    help = 'Force settle a rumor by ID'

    def add_arguments(self, parser):
        parser.add_argument('rumor_id', type=str, help='UUID of the rumor to settle')

    def handle(self, *args, **options):
        rumor_id = options['rumor_id']
        result = settle_rumor(rumor_id)
        self.stdout.write(self.style.SUCCESS(result))
