import { useTheme } from '../context/ThemeContext';

const TECH_STACK = [
  {
    name: "C++",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg"
  },
  {
    name: "C",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg"
  },
  {
    name: "Python",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg"
  },
  {
    name: "JavaScript",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
  },
  {
    name: "Flutter",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg"
  },
  {
    name: "Android Studio",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/android/android-original.svg"
  },
  {
    name: "VS Code",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg"
  },
  {
    name: "Figma",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg"
  },
  {
    name: "Google Colab",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/google/google-original.svg"
  },
  {
    name: "Postman",
    icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg"
  },
  {
    name: "Java",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg"
  },
  {
    name: "TensorFlow",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg"
  },
  {
    name: "React",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
  },
  {
    name: "Firebase",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg"
  },
  {
    name: "MySQL",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg"
  },
  {
    name: "Git",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg"
  }
];

const Skills = () => {
  const { theme } = useTheme();

  return (
    <div className="py-4">
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {TECH_STACK.map((tech) => (
          <div
            key={tech.name}
            className="group flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300"
            style={{ 
              background: theme.secondary,
              boxShadow: '0 4px 6px -1px rgba(0, 129, 112, 0.1), 0 2px 4px -1px rgba(0, 129, 112, 0.06)'
            }}
          >
            <img
              src={tech.icon}
              alt={tech.name}
              className="w-8 h-8 md:w-10 md:h-10 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <p 
              className="mt-2 text-xs font-medium transition-colors duration-300"
              style={{ color: theme.text.secondary }}
            >
              {tech.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills; 