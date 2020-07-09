# [MOVIE RECOMMENDATION SYSTEM](https://github.com/ngonhan2k5/cs-ml/tree/master/pro2)
## Contents:
| Contents                                  | Objective                        | Link and APIs                                                                        |
|-------------------------------------------|----------------------------------|--------------------------------------------------------------------------------------|
| EDA (content based)                       | Data explore                     | https://github.com/ngonhan2k5/cs-ml/blob/master/pro2/notebook/eda_content_base.ipynb |
| Demographic                               | top 10 rated                     | http://104.154.17.226:5000/api/top-ten                                               |
| Content based                             | item-item                        | http://104.154.17.226:5000/api/top-ten-similar/49026                                 |
| Collaborative filtering                   | user-movie ratings               | http://104.154.17.226:5000/api/top-ten-rate?user_id=2                                |
| Content based and Collaborative filtering | get_suggested_movies             | http://104.154.17.226:5000/api/suggested_movies/1/Teenage%20Caveman                  |
| Collaborative filtering                   | estimated_rate_by_userId_movieId | http://104.154.17.226:5000/api/estimated_rate/1/218                                  |            |
## Docker Deployments:
### Source: Checkout or Download src from git https://github.com/ngonhan2k5/cs-ml/tree/master/pro2
### Data: Get all data from kaggle: 
* Down all CSV data from https://www.kaggle.com/rounakbanik/the-movies-dataset
* Save to [ml_data/](https://github.com/ngonhan2k5/cs-ml/tree/master/pro2/backend/ml_data)
* At release folder: run to train and create **model2.pickel** (to backend/ml_models folder) \
``` python model2-create```
* One prepared sqlite file too big to submit to Sakai so need get from [movies_metadata.db](https://github.com/ngonhan2k5/cs-ml/blob/master/pro2/backend/app/movies_metadata.db)
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


