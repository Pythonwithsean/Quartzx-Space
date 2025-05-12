"use client";

import { useNavigate } from "react-router";
import Header from "../Components/Header";
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Lightbulb,
  Quote,
} from "lucide-react";
import "../Styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>The Platform for Students to Embrace Learning</h1>
          <p className="hero-subtitle">
            Discover a new way to learn, collaborate, and grow with our
            innovative educational platform
          </p>
          <button className="cta-button" onClick={() => navigate("/Login")}>
            Get Started <ArrowRight className="icon" size={16} />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <BookOpen size={32} />
            </div>
            <h3>Comprehensive Courses</h3>
            <p>
              Access thousands of courses across various subjects tailored to
              your learning needs.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Users size={32} />
            </div>
            <h3>Collaborative Learning</h3>
            <p>
              Connect with peers and instructors to enhance your learning
              experience.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Award size={32} />
            </div>
            <h3>Earn Certifications</h3>
            <p>
              Get recognized for your achievements with industry-recognized
              certifications.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Lightbulb size={32} />
            </div>
            <h3>Personalized Learning</h3>
            <p>
              Adaptive learning paths that adjust to your progress and
              preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Students Say</h2>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="quote-icon">
              <Quote size={24} />
            </div>
            <p>
              "This platform transformed my learning experience. The interactive
              courses and supportive community helped me achieve my goals."
            </p>
            <div className="testimonial-author">
              <div>
                <h4>Sarah Johnson</h4>
                <p>Computer Science Student</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="quote-icon">
              <Quote size={24} />
            </div>
            <p>
              "The personalized learning paths and quality content made all the
              difference in my educational journey."
            </p>
            <div className="testimonial-author">
              <div>
                <h4>Michael Chen</h4>
                <p>Business Administration Student</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Learning Journey?</h2>
          <p>
            Join thousands of students who are already transforming their
            education experience.
          </p>
          <button className="cta-button" onClick={() => navigate("/Login")}>
            Join Now <ArrowRight className="icon" size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <ul>
              <li>Our Story</li>
              <li>Team</li>
              <li>Careers</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li>Blog</li>
              <li>Guides</li>
              <li>Help Center</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Connect</h3>
            <ul>
              <li>Contact Us</li>
              <li>Support</li>
              <li>Social Media</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Learning Platform. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
