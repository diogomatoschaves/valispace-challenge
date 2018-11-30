from django.db import models


class Functions(models.Model):

    name = models.TextField(unique=True)
    # expression = models.TextField()
    operator = models.TextField(null=True, default=None)
    first_parameter_func = models.ForeignKey('self', related_name='first_function',
                                                blank=True, null=True, on_delete=None, default=None)
    first_parameter_int = models.IntegerField(null=True, blank=True, default=None)
    second_parameter_func = models.ForeignKey('self', related_name='second_function',
                                                 blank=True, null=True, on_delete=None, default=None)
    second_parameter_int = models.IntegerField(null=True, blank=True, default=None)

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'id': self.id,
            'name': self.name,
            'operator': self.operator,
            'first_parameter_func': self.first_parameter_func.id if self.first_parameter_func else None,
            'first_parameter_int': self.first_parameter_int,
            'second_parameter_func': self.second_parameter_func.id if self.second_parameter_func else None,
            'second_parameter_int': self.second_parameter_int,
        }
