const User = require("../models/user");

exports.addToLikedMovies = async (req, res, next) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ _id }) => _id === data._id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data], // Corrected line
          },
          {
            new: true,
          }
        );
      } else {
        return res
          .status(200)
          .json({ message: "Movie already added to liked list" });
      }
    } else {
      await User.create({ email, likedMovies: [data] }); // Corrected line
    }
    return res.status(201).json({ message: "Movie added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error adding movie" });
  }
};

exports.getLikedMovies = async (req, res, next) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      return res.status(200).json({
        message: "Movies fetched Successfuly",
        data: likedMovies,
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching movie" });
  }
};

exports.removeFromLiked = async (req, res, next) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const { likedMovies } = user;
      const removeMovieIndex = likedMovies.findIndex(({ _id }) => _id === movieId);

      if (removeMovieIndex !== -1) { // Check if index is not -1 (found)
        const remainingMovies = likedMovies.filter(
          ({ _id }) => _id !== movieId
        );
        user.likedMovies = remainingMovies;
        await user.save();
        return res
          .status(201)
          .json({
            message: "Movie removed successfully",
            data: remainingMovies,
          });
      } else {
        return res.status(400).json({ message: "Movie Not Found" });
      }
    } else {
      return res.status(400).json({ message: "User Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error removing movie from list" });
  }
};

