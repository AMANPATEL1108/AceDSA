import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaGithub,
  FaCode,
  FaUserPlus,
  FaChartLine,
  FaPuzzlePiece,
} from "react-icons/fa";



const Home = () => {
  const navigate = useNavigate();

  

  return (
    <div className="bg-gray-900 text-gray-100 font-mono">
      {/* Hero Section */}
      <header id="home" className="bg-gray-800 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl font-extrabold mb-6 text-green-400">
            Revolutionize Your Coding Journey with AceDSA
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Join the open-source movement. Contribute, learn, and track your
            progress in Data Structures and Algorithms.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="bg-green-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-600 transition duration-300"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>
            <button
              className="bg-gray-700 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-600 transition duration-300"
              onClick={() => navigate("/topics")}
            >
              Explore Topics
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-400">
            Why Choose AceDSA?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaGithub className="text-4xl text-green-400" />}
              title="Open-Source Collaboration"
              description="Contribute directly to our GitHub repository. Add DSA topics and coding questions to help the community grow."
            />
            <FeatureCard
              icon={<FaCode className="text-4xl text-green-400" />}
              title="Curated Learning Path"
              description="Access a structured curriculum of DSA topics and coding challenges, curated by the community for optimal learning."
            />
            <FeatureCard
              icon={<FaChartLine className="text-4xl text-green-400" />}
              title="Progress Tracking"
              description="Monitor your growth with detailed progress analytics. Set goals and achieve milestones in your coding journey."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-400">
            How AceDSA Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StepCard
              icon={<FaUserPlus className="text-4xl text-green-400" />}
              title="Sign Up"
              description="Create your account to join the AceDSA community and start contributing."
            />
            <StepCard
              icon={<FaGithub className="text-4xl text-green-400" />}
              title="Contribute"
              description="Add DSA topics or coding questions directly to our GitHub repository."
            />
            <StepCard
              icon={<FaPuzzlePiece className="text-4xl text-green-400" />}
              title="Practice"
              description="Solve problems, implement algorithms, and strengthen your coding skills."
            />
            <StepCard
              icon={<FaChartLine className="text-4xl text-green-400" />}
              title="Track Progress"
              description="Monitor your contributions and problem-solving progress on your dashboard."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-green-400">
            About AceDSA
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            AceDSA(Collaborative Programming Practice Platform) is an innovative
            open-source project designed to revolutionize how developers learn
            and practice Data Structures and Algorithms. Our mission is to
            create a vibrant, community-driven ecosystem where knowledge is
            shared freely and progress is celebrated collectively.
          </p>
          <button className="bg-green-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-600 transition duration-300">
            Learn More About Our Mission
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-400">
            What Our Community Says
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="AceDSA has transformed the way I approach DSA learning. The community support is unparalleled!"
              author="Alex Chen, Software Engineer"
            />
            <TestimonialCard
              quote="Contributing to AceDSA has not only improved my coding skills but also my understanding of open-source collaboration."
              author="Priya Sharma, CS Student"
            />
            <TestimonialCard
              quote="The progress tracking feature keeps me motivated. It's like having a personal coding coach!"
              author="Michael Brown, Full Stack Developer"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Elevate Your Coding Skills?
          </h2>
          <p className="text-xl mb-8">
            Join AceDSA today and become part of a thriving community of
            developers committed to growth and collaboration.
          </p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition duration-300">
            Sign Up Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-green-400">AceDSA</h3>
              <p>
                Empowering developers through open-source collaboration and
                continuous learning.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="hover:text-green-400 transition duration-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="hover:text-green-400 transition duration-300"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-green-400 transition duration-300"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-green-400 transition duration-300"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400">
                Community
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/Gurupatel007/AceDSA"
                    className="hover:text-green-400 transition duration-300"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Gurupatel007/AceDSA"
                    className="hover:text-green-400 transition duration-300"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Gurupatel007/AceDSA"
                    className="hover:text-green-400 transition duration-300"
                  >
                    Forum
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Gurupatel007/AceDSA"
                    className="hover:text-green-400 transition duration-300"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#footer"
                    className="hover:text-green-400 transition duration-300"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#footer"
                    className="hover:text-green-400 transition duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#footer"
                    className="hover:text-green-400 transition duration-300"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; 2024 AceDSA Project. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
    <div className="flex items-center justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-green-400">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const StepCard = ({ icon, title, description }) => (
  <div className="text-center">
    <div className="flex items-center justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-green-400">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const TestimonialCard = ({ quote, author }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
    <p className="text-gray-300 italic mb-4">"{quote}"</p>
    <p className="font-semibold text-green-400">- {author}</p>
  </div>
);

export default Home;
