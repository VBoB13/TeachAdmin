from collections import OrderedDict
import json

from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from rest_framework.utils.serializer_helpers import ReturnDict
from rest_framework.status import HTTP_500_INTERNAL_SERVER_ERROR

from django_countries import countries

from accounts import serializers as acc_serializers


def getFormFieldAttributes(field_name: str, field_value):
    """
    Takes the field as argument and returns the most necessary / essential
    attributes with values, e.g. "help_text: 'whatever the help_text is'"
    as another dictionary.

    PARAMS: field ( 
            rest_framework.fields[.FieldClass] OR ANY OTHER 
            [3rdPartyPackage[.ModuleName][.Field]] 
            )
    OUTPUT: dict ({
                    type: 'field_type',
                    value: 'field_value',
                    required: True/False,
                    allow_blank: True/False,
                    help_text: '(Any)',
                    max_length: num(Int),
                    placeholder: '(Any)'
                })
    """
    # Creating the empty dict to be filled with attribute data
    field_attr_dict = {}
    # Pre-defining the attributes that I'd like to extract
    field_attrs = [
        'value',
        'required',
        'allow_blank',
        'help_text',
        'max_length',
        'label'
    ]
    # Lazy check for class name of the field object to make sure its a legit Field-object
    if('Field' in type(field_value).__name__):
        for attribute in field_attrs:
            # Making sure the field actually has the attribute(s) we look for
            if (attribute in dir(field_value)) and (getattr(field_value, attribute) != None):
                field_attr_dict[attribute] = getattr(field_value, attribute)
            # Very few 'label' attributes get automatically assigned through
            # the serializers, so we generate a 'label' attribute by using
            # the 'field_name' argument
            else:
                # As there are SOME (thus far, only the 'email' field)
                # serializer fields that automatically get a 'label'
                # attribute assigned, this is put in the [else] clause
                if (attribute == 'label'):
                    if ("_" in field_name):
                        label_list = field_name.split("_")
                        label = label_list[0].capitalize() + " " + label_list[1]
                    else:
                        label = field_name.capitalize()
                    field_attr_dict["label"] = label

        # After iterating through the core attributes, we assign field types
        # Since the 'password' field is passed on as a CharField, I decided
        # to tell it apart by its name
        if field_name == "password":
            field_attr_dict["type"] = "password"
            field_attr_dict["placeholder"] = "Enter password"
        elif type(field_value).__name__ == "EmailField":
            field_attr_dict["type"] = "email"
            field_attr_dict["placeholder"] = "example@domain.com"
        elif type(field_value).__name__ == "URLField":
            field_attr_dict["type"] = "url"
            field_attr_dict["placeholder"] = "https://www.example.com"
        elif type(field_value).__name__ == "CountryField":
            field_attr_dict["type"] = "select multiple"
            country_choices = dict(countries)
            field_attr_dict["choices"] = country_choices
            field_attr_dict["placeholder"] = "(Select Country)"
        else:
            field_attr_dict["type"] = "text"
            field_attr_dict["placeholder"] = "Type here..."
        
    return field_attr_dict
    

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
                # Attempt to extract the 'get_fields()' method as
                # a function reference (attribute)
                get_fields_func = getattr(value, 'get_fields', None)
                # Check if the method is actually callable
                if callable(get_fields_func):
                    # As this confirms that the field is a serializer and
                    # has the properties a serializer should have, we then
                    # define an empty slot in the returned dictionary for
                    # the serializer to put its own fields in
                    serializer_data[field] = {}
                    # Iterate through the nested serializer's fields
                    for nest_field, nest_value in value.get_fields().items():
                        # Some fields are omitted in nested serializers,
                        # thus we compare the nested serializer's fields
                        # to the fields in serializer.data
                        if(nest_field in serializer.data[field].keys()):
                            serializer_data[field][nest_field] = getFormFieldAttributes(nest_field, nest_value)
                else:
                    print(
                        "Field '{}' does not have method 'get_fields()'.".format(value))
            else:
                serializer_data[field] = getFormFieldAttributes(field, value)
    else:
        raise ValidationError(
            _("The serializer is NOT from the standard 'Accounts' app.")
        )
                
    return serializer_data
