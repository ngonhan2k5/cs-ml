import pandas as pd
from surprise import Reader, Dataset, SVD
from os import path

import pickle


class TopRateMovieForUser:

    def __init__(self, csv_dir_path, csv_file_name, pkl_dir_path, pkl_filename):
        self.csv_dir_path = csv_dir_path
        self.csv_file_name = csv_file_name

        self.pkl_dir_path = pkl_dir_path
        self.pkl_filename = pkl_filename

    def load_csv_data(self):
        self.data_frame = pd.read_csv(self.csv_dir_path + self.csv_file_name)

    def save_pkl_data(self):
        with open(self.pkl_dir_path + self.pkl_filename, 'wb') as file:
            pickle.dump(self.model, file)

    def train_data(self):

        self.load_csv_data()

        reader = Reader()
        data = Dataset.load_from_df(
            self.data_frame[['userId', 'movieId', 'rating']], reader)

        # Retrieve the trainset.
        trainset = data.build_full_trainset()
        self.model = SVD()
        self.model.fit(trainset)
        self.save_pkl_data()

    def load_pkl_data(self):
        if path.exists(self.pkl_dir_path + self.pkl_filename):

            self.load_csv_data()

            # Load model from pickle file
            with open(self.pkl_dir_path + self.pkl_filename, 'rb') as file:
                self.model = pickle.load(file)
        else:
            self.train_data()

    def get_top_ten_rate_of_user(self, user_id):

        self.load_pkl_data()

        if user_id in self.data_frame['userId'].tolist():
            movie_id_list = list(dict.fromkeys(
                self.data_frame['movieId'].tolist()))
            movie_est_rate = []

            for movie_id in movie_id_list:
                predict = self.model.predict(user_id, movie_id)
                movie_est_rate.append(
                    {'movie_id': movie_id, 'est': predict.est})

            movie_est_rate.sort(key=lambda x: x.get('est'), reverse=True)

            return movie_est_rate[:10]

        return "Error: Invalid user_id"
