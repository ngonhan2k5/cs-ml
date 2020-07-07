import pickle
import pandas as pd 

# df2=pd.read_csv('../input/tmdb-movie-metadata/tmdb_5000_movies.csv')

# from app.model2 import Model2

# Test
id = 155
# print(df2.loc[df2['id']==id][['title', 'overview']])

# Import
with open('../backend/ml_models/model2.pickle', 'rb') as f:
    model2 = pickle.load(f)
    
    # Test model call
    print(model2.get_recommendations(id).to_json())
    # print(json.dumps(model2.get_recommendations(id)))
