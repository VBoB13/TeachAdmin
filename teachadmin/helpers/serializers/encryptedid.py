from django.core.signing import Signer
from cryptography.fernet import Fernet
from rest_framework.serializers import ModelSerializer


SIGNER = Signer('encryptID')
CRYPT_KEY = Fernet.generate_key()
CRYPT_OBJ = Fernet(CRYPT_KEY)


class EncryptedModelSerializer(ModelSerializer):
    """
    ModelSerializer with encrypted ID.
    """
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        if "id" in ret.keys():
            value = CRYPT_OBJ.encrypt(ret['id'].encode())
            ret['id'] = value
        return ret
