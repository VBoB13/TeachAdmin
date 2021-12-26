from django.core.signing import Signer
from rest_framework.serializers import ModelSerializer

class EncryptedModelSerializer(ModelSerializer):
    """
    ModelSerializer with encrypted ID.
    """
    def __init__(self, instance=None, data=..., **kwargs):
        super().__init__(instance=instance, data=data, **kwargs)
        self.signer = Signer('encryptID')

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        if hasattr(ret, "id"):
            value = self.signer.sign(ret['id'])
            ret['id'] = value
        return ret

    def validate_id(self, value):
        value = super().validate_id()
        if isinstance(value, int):
            value = self.signer.unsign(value)
        return value
