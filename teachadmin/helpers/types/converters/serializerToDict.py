from collections import OrderedDict
import json

from rest_framework.utils.serializer_helpers import ReturnDict

from accounts import serializers as acc_serializers

def serializerToFormData(serializer):
    """
    Helper function that takes in a custom serializer and attempts to
    convert it into a 'flattened' dictionary which can then be read easily by
    client-side JavaScript to generate forms.

    PARAMS: serializer (rest_framework.serializers.serializer)
    Output: dict ({})
    """
    serializer_data = {}
    # Checking so that the serializer actually is among the serializers
    # defined within my own serializer module
    if(getattr(serializer, '__module__', None) == acc_serializers.__name__):
        # If the serializer is indeed from the account.serializers module,
        # we iterate through each key:value pair
        for field, value in serializer.get_fields().items():
            # Checking each value for instances of nested serializers
            if(getattr(value, '__module__', None) == acc_serializers.__name__):
                print(
                    "{} is a nested serializer ({}) \
                        within the current one ({})".format(
                            field, type(value), type(serializer)))
                # Attempt to extract the 'get_fields()' method as
                # a function reference (attribute)
                get_fields_func = getattr(value, 'get_fields', None)
                # Check if the method is actually callable
                if callable(get_fields_func):
                    print("\n Field's .get_fields() exist.\n")
                    print("Iterating through {}'s fields: \n".format(field))
                    # Iterate through the nested serializer's fields
                    for nest_field, nest_value in value.get_fields().items():
                        # Some fields are omitted in nested serializers,
                        # thus we compare the nested serializer's fields
                        # to the fields in serializer.data
                        if(nest_field in serializer.data[field].keys()):
                            print("Field name: {} \
                                \nField type: {}".format(nest_field, type(nest_value)))
                            serializer_data[nest_field] = nest_value
                else:
                    print(
                        "Field '{}' does not have method 'get_fields()'.".format(value))
            else:
                print("Field name: {} \
                        \nField type: {}".format(field, type(value)))
                serializer_data[field] = value
    print(serializer_data)
    return serializer_data
