import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // Section titles
          aboutTitle: 'About Me',
          experienceTitle: 'Experience',
          projectsTitle: 'Projects',
          skillsTitle: 'Skills',
          githubStatsTitle: 'GitHub Stats',
          contactTitle: 'Contact',
          
          // Page content
          welcome: 'Welcome to My Portfolio',
          tagline: 'Software Engineer & AI Enthusiast',
          aboutContent: 'Master\'s student in Software Engineering at University of Montpellier with expertise in Java, React, and cloud technologies. Passionate about building innovative solutions and continuous learning.',
          copyright: '© 2025 CHAHRAOUI Idriss. All rights reserved.',
          downloadResume: 'Download Resume',
          
          // Data arrays (use distinct keys)
          projectsData: [
            {
              title: 'Educational Software Platform',
              description: 'Developed learning management system for professional training',
              technologies: 'React, Node.js, MongoDB'
            },
            {
              title: 'Financial Management Suite',
              description: 'Created custom accounting solutions for enterprise partners',
              technologies: 'Java, Spring Boot, MySQL'
            },
            {
              title: 'IoT Monitoring System',
              description: 'Built sensor network dashboard for water management',
              technologies: 'Arduino, C++, Python'
            }
          ],
          skillsData: ['React', 'Java', 'Spring Boot', 'Node.js', 'Linux', 'Azure', 'Docker', 'SQL', 'Cybersecurity', 'CI/CD'],
          experienceData: [
            {
              title: 'Web Developer',
              company: 'Mon centre référence',
              description: 'Developed educational software and financial solutions, managed Linux environments',
              date: 'Nov 2023 - Sep 2024'
            },
            {
              title: 'IT Technician',
              company: 'Agence du bassin hydraulique',
              description: 'Deployed virtual machines, configured monitoring systems, secured internal programs',
              date: 'Apr 2022 - Jun 2022'
            },
            {
              title: 'IT Technician',
              company: 'IVENTEQ',
              description: 'Provided IT support, recommended hardware improvements, implemented security protocols',
              date: 'Jun 2021 - Jul 2021'
            }
          ]
        }
      },
      fr: {
        translation: {
          // Section titles
          aboutTitle: 'À propos de moi',
          experienceTitle: 'Expérience',
          projectsTitle: 'Projets',
          skillsTitle: 'Compétences',
          githubStatsTitle: 'Stats GitHub',
          contactTitle: 'Contact',
          
          // Page content
          welcome: 'Bienvenue sur mon portfolio',
          tagline: 'Ingénieur logiciel & passionné d’IA',
          aboutContent: 'Étudiant en Master Génie Logiciel à l\'Université de Montpellier, spécialisé en Java, React et technologies cloud. Passionné par la création de solutions innovantes et l\'apprentissage continu.',
          copyright: '© 2025 CHAHRAOUI Idriss. Tous droits réservés.',
          downloadResume: 'Télécharger le CV',
          
          // Data arrays
          projectsData: [
            {
              title: 'Plateforme logicielle éducative',
              description: 'Développement de système de gestion de l\'apprentissage pour la formation professionnelle',
              technologies: 'React, Node.js, MongoDB'
            },
            {
              title: 'Suite de gestion financière',
              description: 'Solutions comptables personnalisées pour les partenaires d\'entreprise',
              technologies: 'Java, Spring Boot, MySQL'
            },
            {
              title: 'Système de surveillance IoT',
              description: 'Tableau de bord pour la gestion des réseaux de capteurs d\'eau',
              technologies: 'Arduino, C++, Python'
            }
          ],
          skillsData: ['React', 'Java', 'Spring Boot', 'Node.js', 'Linux', 'Azure', 'Docker', 'SQL', 'Cybersécurité', 'CI/CD'],
          experienceData: [
            {
              title: 'Développeur Web',
              company: 'Mon centre référence',
              description: 'Développement de logiciels éducatifs et de solutions financières, gestion d\'environnements Linux',
              date: 'Nov 2023 - Sep 2024'
            },
            {
              title: 'Technicien Informatique',
              company: 'Agence du bassin hydraulique',
              description: 'Déploiement de machines virtuelles, configuration de systèmes de surveillance, sécurisation des programmes internes',
              date: 'Avr 2022 - Juin 2022'
            },
            {
              title: 'Technicien Informatique',
              company: 'IVENTEQ',
              description: 'Assistance informatique, recommandations matérielles, mise en place de protocoles de sécurité',
              date: 'Juin 2021 - Juil 2021'
            }
          ]
        }
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;