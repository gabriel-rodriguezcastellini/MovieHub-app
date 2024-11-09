import React from "react";

const About: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">About MovieHub</h1>
      <p className="mb-2">
        MovieHub is a platform where you can find information about your
        favorite movies, select showtimes, and book seats.
      </p>
      <p className="mb-2">
        Our mission is to provide a seamless and enjoyable experience for movie
        enthusiasts.
      </p>
    </div>
  );
};

export default About;
