import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ExternalLink, Code2, Star,
  ChevronRight, Layers, Layout, Globe, Package, Cpu, Code,
} from "lucide-react";

const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];
  
  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        <span className="text-xs md:text-sm font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }) => {
  return (
    <li className="group flex items-start space-x-2.5 p-1.5 md:p-2 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
      <div className="relative mt-1.5">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors leading-relaxed">
        {feature}
      </span>
    </li>
  );
};

// Function to extract technologies from description
const extractTechnologies = (description) => {
  if (!description) return [];
  
  const techKeywords = {
    // Frontend Frameworks
    'React': ['react', 'react.js', 'reactjs', 'reactjs'],
    'React Native': ['react native', 'react-native', 'reactnative'],
    'Vue.js': ['vue.js', 'vuejs', 'vue'],
    'Angular': ['angular', 'angularjs', 'angular.js'],
    'Next.js': ['next.js', 'nextjs', 'next'],
    'Nuxt.js': ['nuxt.js', 'nuxtjs', 'nuxt'],
    
    // Languages
    'TypeScript': ['typescript', 'ts'],
    'JavaScript': ['javascript', 'js', 'es6', 'es2015', 'ecmascript'],
    'Python': ['python', 'py'],
    'Java': ['java'],
    'PHP': ['php'],
    'Ruby': ['ruby'],
    'Go': ['go', 'golang'],
    'C++': ['c++', 'cpp'],
    'C#': ['c#', 'csharp'],
    
    // Markup & Styling
    'HTML5': ['html5', 'html'],
    'CSS3': ['css3', 'css'],
    'SCSS': ['scss', 'sass'],
    'SASS': ['sass'],
    'Less': ['less'],
    'Tailwind CSS': ['tailwind', 'tailwindcss'],
    'Bootstrap': ['bootstrap'],
    'Styled Components': ['styled-components', 'styled components'],
    'Material-UI': ['material-ui', 'react-material-ui', 'mui', 'material ui'],
    'Ant Design': ['ant design', 'antd'],
    'jQuery': ['jquery', 'jq'],
    
    // Backend Frameworks
    'Django': ['django'],
    'Flask': ['flask'],
    'FastAPI': ['fastapi', 'fast api'],
    'Node.js': ['node.js', 'nodejs', 'node'],
    'Express': ['express', 'express.js', 'expressjs'],
    'NestJS': ['nestjs', 'nest.js'],
    'Laravel': ['laravel'],
    'Symfony': ['symfony'],
    'Spring Boot': ['spring boot', 'springboot'],
    'ASP.NET': ['asp.net', 'aspnet'],
    
    // Databases
    'MongoDB': ['mongodb', 'mongo'],
    'PostgreSQL': ['postgresql', 'postgres'],
    'MySQL': ['mysql'],
    'SQLite': ['sqlite'],
    'Oracle': ['oracle'],
    'SQL Server': ['sql server', 'mssql'],
    'DynamoDB': ['dynamodb', 'dynamo'],
    'Redis': ['redis'],
    'Elasticsearch': ['elasticsearch', 'elastic search'],
    'Cassandra': ['cassandra'],
    
    // Cloud & DevOps
    'AWS': ['aws', 'amazon web services', 'amazon'],
    'EC2': ['ec2'],
    'S3': ['s3', 'amazon s3'],
    'Lambda': ['lambda', 'aws lambda'],
    'CloudFront': ['cloudfront'],
    'Cognito': ['cognito', 'aws cognito'],
    'AppSync': ['appsync', 'aws appsync'],
    'Azure': ['azure', 'microsoft azure'],
    'GCP': ['gcp', 'google cloud', 'google cloud platform'],
    'Firebase': ['firebase'],
    'Heroku': ['heroku'],
    'Vercel': ['vercel'],
    'Netlify': ['netlify'],
    'Jenkins': ['jenkins'],
    'GitHub Actions': ['github actions', 'gh actions'],
    'GitLab CI': ['gitlab ci', 'gitlab'],
    'Docker': ['docker'],
    'Kubernetes': ['kubernetes', 'k8s'],
    'Nginx': ['nginx'],
    'Apache': ['apache'],
    
    // APIs & Services
    'GraphQL': ['graphql'],
    'Apollo': ['apollo', 'apollo client', 'apollo server'],
    'REST API': ['rest api', 'restapi', 'rest'],
    'WebSocket': ['websocket', 'websockets', 'ws'],
    'OpenTok': ['opentok'],
    'Twilio': ['twilio'],
    'Stripe': ['stripe'],
    'PayPal': ['paypal'],
    
    // State Management & Libraries
    'Redux': ['redux'],
    'MobX': ['mobx'],
    'Zustand': ['zustand'],
    'Recoil': ['recoil'],
    'D3.js': ['d3.js', 'd3js', 'd3'],
    'Chart.js': ['chart.js', 'chartjs'],
    'Axios': ['axios'],
    'Fetch API': ['fetch api', 'fetch'],
    
    // Tools & Platforms
    'Webflow': ['webflow'],
    'Figma': ['figma'],
    'Git': ['git', 'github', 'gitlab', 'bitbucket'],
    'CI/CD': ['ci/cd', 'continuous integration', 'continuous deployment', 'cicd'],
    'Jest': ['jest'],
    'Mocha': ['mocha'],
    'Cypress': ['cypress'],
    'Webpack': ['webpack'],
    'Vite': ['vite'],
    'Babel': ['babel'],
    'ESLint': ['eslint'],
    'Prettier': ['prettier'],
    
    // Mobile
    'iOS': ['ios', 'iphone', 'ipad'],
    'Android': ['android'],
    'Flutter': ['flutter'],
    'Ionic': ['ionic'],
    'Xamarin': ['xamarin'],
    
    // Other
    'OAuth2': ['oauth2', 'oauth'],
    'JWT': ['jwt', 'json web token'],
    'FCM': ['fcm', 'firebase cloud messaging'],
    'PWA': ['pwa', 'progressive web app'],
    'WebRTC': ['webrtc'],
    'Socket.io': ['socket.io', 'socketio'],
  };
  
  const found = [];
  const descLower = description.toLowerCase();
  
  // Sort technologies by specificity (longer keywords first to avoid partial matches)
  const sortedTechs = Object.entries(techKeywords).sort((a, b) => {
    const aMaxLen = Math.max(...a[1].map(k => k.length));
    const bMaxLen = Math.max(...b[1].map(k => k.length));
    return bMaxLen - aMaxLen;
  });
  
  // Check for each technology (prioritize longer/more specific matches)
  sortedTechs.forEach(([tech, keywords]) => {
    // Check if any keyword matches
    const hasMatch = keywords.some(keyword => {
      const keywordLower = keyword.toLowerCase();
      // Use word boundary or exact match for better accuracy
      const regex = new RegExp(`\\b${keywordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return regex.test(descLower);
    });
    
    if (hasMatch && !found.includes(tech)) {
      found.push(tech);
    }
  });
  
  // Sort found technologies by category for better display
  const categoryOrder = [
    'React', 'Vue.js', 'Angular', 'React Native', 'Next.js',
    'TypeScript', 'JavaScript', 'Python', 'Node.js',
    'HTML5', 'CSS3', 'SCSS', 'Tailwind CSS', 'Styled Components',
    'Django', 'Express', 'Laravel',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
    'AWS', 'Firebase', 'Docker', 'Kubernetes',
    'GraphQL', 'REST API', 'WebSocket',
    'Redux', 'Git', 'CI/CD'
  ];
  
  // Sort: prioritize known order, then alphabetically
  return found.sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a);
    const bIndex = categoryOrder.indexOf(b);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.localeCompare(b);
  });
};

// Function to extract key features from description
const extractFeatures = (description) => {
  if (!description) return [];
  
  const features = [];
  const sentences = description.split(/[.!?]+/).filter(s => s.trim().length > 15);
  
  sentences.forEach(sentence => {
    let trimmed = sentence.trim();
    if (trimmed.length < 15) return;
    
    // Action verbs that indicate key features
    const actionVerbs = [
      'designed', 'developed', 'built', 'created', 'implemented', 'integrated', 
      'migrated', 'refactored', 'optimized', 'configured', 'delivered', 
      'translated', 'worked on', 'leading', 'overseeing', 'coordinating', 
      'managing', 'streamlining', 'ensuring', 'leveraging', 'adhering to', 
      'focusing on', 'added', 'reduced', 'improved', 'enhanced', 'maintaining', 
      'prioritizing', 'deployed', 'processing', 'implemented', 'built'
    ];
    
    // Check if sentence starts with or contains action verbs
    const hasActionVerb = actionVerbs.some(verb => {
      const regex = new RegExp(`\\b${verb}\\b`, 'i');
      return regex.test(trimmed);
    });
    
    if (hasActionVerb) {
      // Clean and format the feature
      let feature = trimmed
        .replace(/^(?:and|or|but|with|using|via|through|by|for|in|on|at|to)\s+/i, '')
        .replace(/\s+/g, ' ')
        .trim();
      
      // Capitalize first letter
      if (feature.length > 0) {
        feature = feature.charAt(0).toUpperCase() + feature.slice(1);
        
        // Ensure it ends properly
        if (!/[.!?]$/.test(feature)) {
          feature += '.';
        }
        
        // Only add meaningful features (not too short, not too long, unique)
        if (feature.length >= 25 && feature.length <= 200 && !features.includes(feature)) {
          features.push(feature);
        }
      }
    }
  });
  
  // If we have too many features, prioritize the most descriptive ones
  if (features.length > 8) {
    // Sort by length (longer = more descriptive) and take top 8
    return features.sort((a, b) => b.length - a.length).slice(0, 8);
  }
  
  return features;
};

const ProjectStats = ({ project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#0a0a1a] rounded-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-50 blur-2xl z-0" />

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-lg">
        <div className="bg-blue-500/20 p-1.5 md:p-2 rounded-full">
          <Code2 className="text-blue-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-blue-200">{techStackCount}</div>
          <div className="text-[10px] md:text-xs text-gray-400">Total Teknologi</div>
        </div>
      </div>

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-purple-500/20 transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-lg">
        <div className="bg-purple-500/20 p-1.5 md:p-2 rounded-full">
          <Layers className="text-purple-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-purple-200">{featuresCount}</div>
          <div className="text-[10px] md:text-xs text-gray-400">Fitur Utama</div>
        </div>
      </div>
    </div>
  );
};


const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const selectedProject = storedProjects.find((p) => String(p.id) === id);
    
    if (selectedProject) {
      // Extract technologies and features from description if not already present
      const extractedTechStack = selectedProject.TechStack && selectedProject.TechStack.length > 0 
        ? selectedProject.TechStack 
        : extractTechnologies(selectedProject.Description || '');
      
      const extractedFeatures = selectedProject.Features && selectedProject.Features.length > 0 
        ? selectedProject.Features 
        : extractFeatures(selectedProject.Description || '');
      
      const enhancedProject = {
        ...selectedProject,
        Features: extractedFeatures,
        TechStack: extractedTechStack,
        Github: selectedProject.Github || 'https://github.com/EkiZR',
      };
      setProject(enhancedProject);
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold text-white">Loading Project...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] px-[2%] sm:px-0 relative overflow-hidden">
      {/* Background animations remain unchanged */}
      <div className="fixed inset-0">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12 animate-fadeIn">
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-white/50">
              <span>Projects</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-white/90 truncate">{project.Title}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6 md:space-y-10 animate-slideInLeft">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                  {project.Title}
                </h1>
                <div className="relative h-1 w-16 md:w-24">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm" />
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-base md:text-lg text-gray-300/90 leading-relaxed">
                  {project.Description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 md:gap-4">
                {/* Action buttons */}
                <a
                  href={project.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:from-blue-600/20 hover:to-purple-600/20 text-blue-300 rounded-xl transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                >
                  <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-blue-600/10 to-purple-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                  <ExternalLink className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                  <span className="relative font-medium">Live Demo</span>
                </a>
              </div>

              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-semibold text-white/90 mt-[3rem] md:mt-0 flex items-center gap-2 md:gap-3">
                  <Code2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                  Technologies Used
                </h3>
                {project.TechStack.length > 0 ? (
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.TechStack.map((tech, index) => (
                      <TechBadge key={index} tech={tech} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm md:text-base text-gray-400 opacity-50">No technologies added.</p>
                )}
              </div>
            </div>

            <div className="space-y-6 md:space-y-10 animate-slideInRight">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={project.Img}
                  alt={project.Title}
                  className="w-full  object-cover transform transition-transform duration-700 will-change-transform group-hover:scale-105"
                  onLoad={() => setIsImageLoaded(true)}
                />
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors duration-300 rounded-2xl" />
              </div>

              {/* Fitur Utama */}
              <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6 hover:border-white/20 transition-colors duration-300 group">
                <h3 className="text-xl font-semibold text-white/90 flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-400 group-hover:rotate-[20deg] transition-transform duration-300" />
                  Key Features
                </h3>
                {project.Features.length > 0 ? (
                  <ul className="list-none space-y-1">
                    {project.Features.map((feature, index) => (
                      <FeatureItem key={index} feature={feature} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 opacity-50">No features added.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.7s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetails;
