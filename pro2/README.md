# MOVIE RECOMMENDATION SYSTEM
## Docker Deployments:
### Download src from git https://github.com/ngonhan2k5/cs-ml/tree/master/pro2
### Get all data from kaggle: 
* Down data from https://www.kaggle.com/rounakbanik/the-movies-dataset
* Save to /backend/ml_data
* At release folder: run to train and create **model2.pickel** (to backend/ml_models folder) \
``` python model2-create``
### Build and up docker using docker-compose
At [pro2/](https://github.com/ngonhan2k5/cs-ml/tree/master/pro2) \
```docker-compose build``` \
```docker-compose up```

## Manual Deployment
### Front-end: Nextjs
to start, in frontend folder run\
```npm install```\
```npm run dev```
### Back-end: Flask
to start, in backend folder run\
```python -m flask run ```

### Dependences
* pip install flask_sqlalchemy
* pip install flask_marshmallow
* pip install surprise
* pip install flask_cors \

[more...](https://github.com/ngonhan2k5/cs-ml/blob/master/pro2/backend/requirements.txt)

## Model2 - top similar of 1 movie:
### Containner class:
**Model2** in model2.py, must have same import hierarchy when create and using
### Train:
Training is create similarity TD-TRD matrix and freeze into pickle file
* at release folder: run to train and create **model2.pickel** (to backend/ml_models folder) \
``` python model2-create```
### Test:
* at release folder: run to test  \
``` python model2-test```
### Release:
* Web API will load pickle file and use to lookup


