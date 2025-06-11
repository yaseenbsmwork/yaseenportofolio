import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      category: "Frontend Development",
      skills: [
        { name: "React.js", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "HTML5", level: 90 },
        { name: "CSS3/SASS", level: 85 },
        { name: "Tailwind CSS", level: 80 },
      ]
    },
    {
      category: "Backend Development",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 80 },
        { name: "MongoDB", level: 75 },
        { name: "PostgreSQL", level: 70 },
        { name: "RESTful APIs", level: 85 },
      ]
    },
    {
      category: "Tools & Others",
      skills: [
        { name: "Git", level: 85 },
        { name: "Docker", level: 70 },
        { name: "AWS", level: 65 },
        { name: "Jest", level: 75 },
        { name: "Webpack", level: 70 },
      ]
    }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center" style={{background: 'transparent'}}>
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Technical Skills</h1>
      <div className="space-y-12 w-full max-w-3xl">
        {skillCategories.map((category, index) => (
          <div key={index} className="rounded-lg shadow-xl p-8 bg-opacity-0" style={{background: 'transparent'}}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{category.category}</h2>
            <div className="space-y-6">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 font-medium">{skill.name}</span>
                    <span className="text-gray-600">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills; 