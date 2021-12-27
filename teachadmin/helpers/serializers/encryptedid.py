from django.core.signing import Signer
from rest_framework.serializers import ModelSerializer


SIGNER = Signer('encryptID')


class EncryptedModelSerializer(ModelSerializer):
    """
    ModelSerializer with encrypted ID.
    """
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        if "id" in ret.keys():
            value = SIGNER.sign(ret['id'])
            ret['id'] = value
        return ret
