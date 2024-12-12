import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-[#EDF8FA]">

      {/* Banner Section */}
      <section className="bg-[#3AB092] text-white py-20 text-center">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Welcome to Nihongo Blossom!</h1>
          <p className="text-xl mb-6">Your gateway to learning Japanese vocabulary in a fun and interactive way. Let's start your learning journey today!</p>
          <Link to='/lessons' className="bg-[#164193] text-white py-3 px-8 rounded-lg text-xl hover:bg-[#1CA288]">Start Learning Now</Link>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 text-center">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#164193] mb-6">About Us</h2>
          <p className="text-lg mb-8">
            Nihongo Blossom is designed to help you learn the Japanese language effortlessly. Whether you're a beginner or looking to enhance your skills, we offer interactive lessons and tutorials to suit your learning pace.
          </p>
          <p className="text-lg mb-8">
            With a blend of vocabulary lessons, videos, and a community of learners, we aim to provide a well-rounded approach to mastering Japanese. Join us on your path to fluency!
          </p>
        </div>
      </section>

      {/* How to Use Section */}
      <section id="how-to-use" className="bg-[#C9E5E9] py-20 text-center">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#164193] mb-6">How to Use Nihongo Blossom</h2>
          <p className="text-lg mb-8">
            Our platform is simple and intuitive. Here's how to get started:
          </p>
          <div className="flex justify-center gap-16 flex-wrap">
            <div className="max-w-xs bg-white p-6 rounded-lg shadow-lg mb-8">
              <h3 className="text-xl font-semibold text-[#164193] mb-4">Step 1: Sign Up</h3>
              <p>Sign up with your email or Google account to get started. It's free and takes just a minute!</p>
            </div>
            <div className="max-w-xs bg-white p-6 rounded-lg shadow-lg mb-8">
              <h3 className="text-xl font-semibold text-[#164193] mb-4">Step 2: Choose a Lesson</h3>
              <p>Browse through our interactive lessons, from basic vocabulary to advanced phrases. Pick a lesson and start learning!</p>
            </div>
            <div className="max-w-xs bg-white p-6 rounded-lg shadow-lg mb-8">
              <h3 className="text-xl font-semibold text-[#164193] mb-4">Step 3: Practice & Learn</h3>
              <p>Practice with quizzes, review your progress, and complete lessons at your own pace. Learning Japanese has never been easier!</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 text-center">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#164193] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div className="text-left">
              <h3 className="text-xl font-semibold text-[#164193] mb-2">How do I sign up?</h3>
              <p>Simply click on the "Start Learning Now" button, and you can sign up with your email or Google account.</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold text-[#164193] mb-2">What lessons are available?</h3>
              <p>We offer a wide range of lessons, from vocabulary basics to complex sentences and cultural tips. There's something for everyone!</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold text-[#164193] mb-2">Do I need any prior knowledge of Japanese?</h3>
              <p>No! Our lessons are designed for beginners and advanced learners alike. Start at your level and progress at your own pace.</p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold text-[#164193] mb-2">Can I track my progress?</h3>
              <p>Yes, you can track your progress after each lesson and see how far you've come in your learning journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wishes Section */}
      <section id="wishes" className="bg-[#3AB092] text-white py-20 text-center">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">We Wish You Success!</h2>
          <p className="text-lg mb-8">
            Thank you for choosing Nihongo Blossom as your language learning companion. We wish you all the best on your journey to mastering Japanese!
          </p>
          <p className="text-lg mb-8">
            Stay curious, stay motivated, and never stop learning. 頑張ってください (Good luck)!
          </p>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
