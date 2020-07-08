import pandas as pd 
from sklearn.feature_extraction.text import TfidfVectorizer

class Model2:
    def __init__(self, movie_csv_path):

        df2=pd.read_csv(movie_csv_path, low_memory=False)
        df2.drop(df2.columns.difference(['overview','id']), 1, inplace=True)
        self.index_movieid = pd.Series(df2.index, index=df2['id'].apply(lambda x: int(x) if x.isdigit() else x)).drop_duplicates()
        # self.cosine_sim = self.create_cosine_sim_matrix(df2)
        self.tfidf_matrix = self.create_tfidf_matrix(df2)

    def create_tfidf_matrix(self, df2):
        #Define a TF-IDF Vectorizer Object. Remove all english stop words such as 'the', 'a'
        tfidf = TfidfVectorizer(stop_words='english', min_df=0.01)

        #Replace NaN with an empty string
        df2['overview'] = df2['overview'].fillna('')

        # 2. Create similar matrix
        #Construct the required TF-IDF matrix by fitting and transforming the data
        tfidf_matrix = tfidf.fit_transform(df2['overview'])

        print("Shape", tfidf_matrix.shape)

        return tfidf_matrix
    
    def get_cosine_sim_matrix_movie(self, movie_id):
        from sklearn.metrics.pairwise import linear_kernel
        if  movie_id in self.index_movieid.index:
            print("Found movie_id")
            idx = self.index_movieid[movie_id]
            cosine_sim = linear_kernel(self.tfidf_matrix[idx], self.tfidf_matrix)
            return cosine_sim[0]
        else:
            print("Not found movie_id in", self.index_movieid.index)
            return []

    def create_cosine_sim_matrix(self, df2):
        #Define a TF-IDF Vectorizer Object. Remove all english stop words such as 'the', 'a'
        tfidf = TfidfVectorizer(stop_words='english')

        #Replace NaN with an empty string
        df2['overview'] = df2['overview'].fillna('')

        # 2. Create similar matrix
        #Construct the required TF-IDF matrix by fitting and transforming the data
        tfidf_matrix = tfidf.fit_transform(df2['overview'])

        print("Shape", tfidf_matrix.shape)
        # tfidf_matrix.sample(3)

        # Import linear_kernel
        from sklearn.metrics.pairwise import linear_kernel

        # Compute the cosine similarity matrix
        cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
        print("Cosin Shape", cosine_sim.shape)

        return cosine_sim

    # Function that takes in movie title as input and outputs most similar movies
    def get_recommendations(self, movie_id):
        # cosine_sim=self.cosine_sim
        cosine_sim = self.get_cosine_sim_matrix_movie(movie_id)
        # Get the index of the movie that matches the title
        # if movie_id in self.index_movieid:
        #     idx = self.index_movieid[movie_id]

        # Get the pairwsie similarity scores of all movies with that movie
        sim_scores = list(enumerate(cosine_sim))

        # Sort the movies based on the similarity scores
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        # Get the scores of the 10 most similar movies
        sim_scores = sim_scores[1:11]

        # Get the movie indices
        movie_indices = [i[0] for i in sim_scores]
        print(movie_indices)
        # else:
        #     movie_indices = []
        # Return the top 10 most similar movies
        # return df2[['title', 'id']].iloc[movie_indices]
        return self.index_movieid.iloc[movie_indices]