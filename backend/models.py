from django.db import models

# Create your models here.
class Comment(models.Model):
    author = models.CharField(max_length=200)
    text = models.TextField()
    date = models.DateTimeField()
    likes = models.IntegerField()
    image = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return f"{self.author} - {self.date}"