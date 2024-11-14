import React from "react";

const About: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">About MovieHub</h1>
      <p className="mb-2">
        MovieHub is a platform where you can find information about your
        favorite movies, select showtimes, and book seats. Our mission is to
        provide a seamless and enjoyable experience for movie enthusiasts.
      </p>
      <h2 className="text-2xl font-bold mb-2">Our Features</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Browse popular movies</li>
        <li>View detailed information about each movie</li>
        <li>Read and write reviews</li>
        <li>Watch trailers and exclusive clips</li>
        <li>Get personalized recommendations</li>
        <li>Find showtimes and book tickets</li>
        <li>Create and manage watchlists</li>
        <li>Receive notifications for upcoming releases</li>
        <li>Access exclusive behind-the-scenes content</li>
      </ul>
      <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
      <p className="mb-2">
        At MovieHub, we aim to be the go-to destination for movie lovers. We
        strive to offer the most comprehensive and up-to-date information about
        movies, ensuring that our users have the best possible experience.
      </p>
      <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
      <p className="mb-2">
        We envision a world where movie enthusiasts can easily access all the
        information they need about their favorite films, connect with other
        fans, and enjoy a rich and immersive movie-watching experience.
      </p>
      <h2 className="text-2xl font-bold mb-2">Our Values</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Passion for movies</li>
        <li>Commitment to quality</li>
        <li>Innovation and creativity</li>
        <li>Respect and inclusivity</li>
        <li>Customer satisfaction</li>
      </ul>
      <h2 className="text-2xl font-bold mb-2">Our Team</h2>
      <p className="mb-2">
        Our team is composed of passionate movie enthusiasts, developers, and
        designers who are dedicated to creating a user-friendly and feature-rich
        platform. We are constantly working to improve MovieHub and add new
        features based on user feedback.
      </p>
      <h2 className="text-2xl font-bold mb-2">Our History</h2>
      <p className="mb-2">
        MovieHub was founded in 2023 by a group of movie lovers who wanted to
        create a better way for people to discover and enjoy movies. Since then,
        we have grown into a thriving community of film enthusiasts.
      </p>
      <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
      <p className="mb-2">
        If you have any questions, suggestions, or feedback, please feel free to
        reach out to us at{" "}
        <a
          href="mailto:gabriel.rodriguezcastellini@alumnos.uai.edu.ar"
          className="text-blue-500"
        >
          gabriel.rodriguezcastellini@alumnos.uai.edu.ar
        </a>
        . We would love to hear from you!
      </p>
    </div>
  );
};

export default About;
