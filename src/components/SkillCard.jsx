import { useState } from 'react';
import PropTypes from 'prop-types';

const SkillCard = ({ skill }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="skill-card-container w-full h-48 perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`skill-card relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front of card */}
        <div className="skill-card-front absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={skill.icon} alt={skill.name} className="w-12 h-12 object-contain" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{skill.name}</h3>
        </div>

        {/* Back of card */}
        <div className="skill-card-back absolute w-full h-full backface-hidden bg-gradient-to-br from-[#141E46] to-[#41B06E] rounded-xl shadow-lg p-6 rotate-y-180 text-white">
          <div className="flex flex-col h-full justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
              <div className="flex items-center mb-3">
                <div className="h-2 bg-white/20 rounded-full w-full">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
                <span className="ml-2 text-sm">{skill.proficiency}%</span>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">Notable Projects:</p>
              <ul className="list-disc list-inside text-white/90">
                {skill.projects.map((project, index) => (
                  <li key={index} className="truncate">{project}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SkillCard.propTypes = {
  skill: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    proficiency: PropTypes.number.isRequired,
    projects: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default SkillCard; 