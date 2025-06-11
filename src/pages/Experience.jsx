import React from 'react';

const Experience = () => {
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Company Name",
      period: "2023 - Present",
      description: [
        "Developed and maintained full-stack web applications using React.js and Node.js",
        "Implemented responsive designs and optimized application performance",
        "Collaborated with cross-functional teams to deliver high-quality solutions",
        "Integrated RESTful APIs and implemented authentication systems"
      ]
    },
    {
      title: "Junior Developer",
      company: "Previous Company",
      period: "2022 - 2023",
      description: [
        "Assisted in developing and maintaining web applications",
        "Worked on frontend development using React.js",
        "Participated in code reviews and team meetings",
        "Learned and implemented best practices in web development"
      ]
    }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center" style={{background: 'transparent'}}>
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Work Experience</h1>
      <div className="space-y-8 w-full max-w-3xl">
        {experiences.map((exp, index) => (
          <div key={index} className="rounded-lg shadow-xl p-8 bg-opacity-0" style={{background: 'transparent'}}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{exp.title}</h2>
                <p className="text-gray-600">{exp.company}</p>
              </div>
              <span className="text-blue-600 font-medium">{exp.period}</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {exp.description.map((item, itemIndex) => (
                <li key={itemIndex} className="text-lg">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience; 