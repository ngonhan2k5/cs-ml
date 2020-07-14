import pickle
import pandas as pd 

import sys
# df2=pd.read_csv('../input/tmdb-movie-metadata/tmdb_5000_movies.csv')

# from app.model2 import Model2

# Test
id = 155
if len(sys.argv)>1:
    id = int(sys.argv[1]) if sys.argv[1].isdigit() else id
# print(df2.loc[df2['id']==id][['title', 'overview']])

# Import
with open('../backend/ml_models/model2.pickle', 'rb') as f:
    model2 = pickle.load(f)
    
    # Test model call
    print(model2.get_recommendations(id).index.tolist())
    # print(json.dumps(model2.get_recommendations(id)))
