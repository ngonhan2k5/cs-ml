#############################################################
# Author: Ngo Nhan
# 1. Load data movive meta file and create TF-IDF matrix    #
# 2. Create index diction for lookup                        #
# 3. Export pickle                                          #
#############################################################

import pickle

import pandas as pd 
import numpy as np

import gzip
import shutil

# 1. Load data
# csv_file = '../input/the-movies/movies_metadata.csv'
csv_file = '../input/tmdb-movie-metadata/tmdb_5000_movies.csv'
# df2=pd.read_csv(csv_file)

# df2['overview'].head(1)


# 3. Export parts
from ml_models.model2 import Model2

# model20 = Model2('../input/tmdb-movie-metadata/tmdb_5000_movies.csv') 
model20 = Model2(csv_file)

# Test model call
id = 155
# print(df2.loc[df2['id']==id][['title', 'overview']])
print(model20.get_recommendations(id))

# Export
with open('../backend/ml_models/model2.pickle', 'wb') as f:
    pickle.dump(model20, f, 4)

# Zip
# with open('../backend/ml_models/model2.pickle', 'rb') as f_in:
#     with gzip.open('../backend/ml_models/model2.pickle.gz', 'wb') as f_out:
#         shutil.copyfileobj(f_in, f_out)