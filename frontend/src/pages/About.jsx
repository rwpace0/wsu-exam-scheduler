const About = () => {
  return (
    <div className="to-customCrimson min-h-screen overflow-hidden bg-gradient-to-br from-black bg-fixed">
      {/* Inner container uses height minus the navbar (4rem) so the content fits exactly in view */}
      <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center px-4">
        {/* Header Section */}
        <header className="text-center">
          <h1 className="mb-6 text-4xl font-bold text-white">About Me</h1>
          <p className="mb-8 max-w-2xl text-lg text-gray-200">
            Hi, my name is Reid Pace and I am a student at Washington State
            University majoring in computer science. This is my first solo web
            app made using React, Flask, and PostgreSQL. If you'd like to know
            more or contact me, please look below.
          </p>
        </header>

        {/* Social Icons */}
        <div className="flex space-x-6">
          {/* GitHub Icon */}
          <a
            href="https://github.com/rwpace0"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="white"
              viewBox="0 0 24 24"
            >
              <title>GitHub</title>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577v-2.234c-3.338.726-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.238 1.84 1.238 1.07 1.835 2.809 1.305 3.495.997.108-.776.418-1.305.762-1.605-2.665-.304-5.467-1.332-5.467-5.931 0-1.31.468-2.381 1.235-3.221-.123-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404 11.5 11.5 0 013.003.404c2.292-1.553 3.298-1.23 3.298-1.23.655 1.653.242 2.873.12 3.176.77.84 1.233 1.911 1.233 3.221 0 4.609-2.807 5.625-5.479 5.921.429.37.823 1.102.823 2.222v3.293c0 .319.218.694.825.576C20.565 21.8 24 17.303 24 12c0-6.63-5.373-12-12-12z" />
            </svg>
          </a>

          {/* LinkedIn Icon */}
          <a
            href="https://www.linkedin.com/in/reidpace"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="white"
              viewBox="0 0 24 24"
            >
              <title>LinkedIn</title>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.026-3.037-1.853-3.037-1.853 0-2.137 1.445-2.137 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.635-1.853 3.367-1.853 3.599 0 4.266 2.368 4.266 5.455v6.289zM5.337 7.433a2.062 2.062 0 01-2.062-2.062 2.062 2.062 0 112.062 2.062zm1.777 13.019H3.561V9h3.553v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.546C0 23.226.792 24 1.771 24h20.451C23.205 24 24 23.226 24 22.273V1.727C24 .774 23.205 0 22.225 0z" />
            </svg>
          </a>

          {/* Email Icon */}
          <a
            href="mailto:rwpace06@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="white"
              viewBox="0 0 24 24"
            >
              <title>Email</title>
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 1.99 2H20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
export default About;
