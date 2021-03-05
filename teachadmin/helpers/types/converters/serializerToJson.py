from collections import OrderedDict
import json

from rest_framework.utils.serializer_helpers import ReturnDict

from accounts import serializers as acc_serializers

def seriousJson(serializer_data):
    """
    A converter that takes a serializer object as an argument and returns an appropriate JSON object.

    PARAMS: serializer (rest_framework.serializer)
    Output: json
    """

    ord_dict = OrderedDict()
    # Iterate through the serializer's fields
    for key in serializer_data:
        print(type(serializer_data[key]))
        # Checking if the serializer contains an OrderedDict
        if type(serializer_data[key]) == type(ord_dict):
            serializer_data[key] = json.dumps(serializer_data[key])
    return serializer_data