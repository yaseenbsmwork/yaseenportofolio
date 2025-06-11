import React from 'react';

const About = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-8" style={{background: 'transparent'}}>
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-bold text-gray-900 mb-12 text-center">About Me</h1>
        
        <div className="grid grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Background</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                I am a dedicated Full Stack Developer with a passion for creating efficient and scalable web applications. 
                Based in Trivandrum, Kerala, I combine technical expertise with creative problem-solving to deliver 
                high-quality solutions.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Education</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6 py-2">
                  <h3 className="text-xl font-medium text-gray-800">Bachelor's Degree in Computer Science</h3>
                  <p className="text-gray-600">University Name</p>
                  <p className="text-gray-500">2019 - 2023</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Professional Journey</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                My journey in web development began with a deep interest in creating interactive and user-friendly 
                applications. Over the years, I've worked on various projects that have helped me develop a strong 
                foundation in both frontend and backend technologies.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Personal Interests</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, 
                and staying updated with the latest trends in web development. I believe in continuous learning 
                and sharing knowledge with the developer community.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 