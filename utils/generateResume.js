import { jsPDF } from 'jspdf';

export const generateResumePDF = () => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(22);
  doc.setTextColor(40, 53, 147);
  doc.text('CHAHRAOUI Idriss', 105, 20, null, null, 'center');
  
  // Contact Info
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text('Montpellier (34000) | chahraouiidriss@gmail.com | 06 99 67 52 25', 105, 28, null, null, 'center');
  
  // Sections
  const sections = [
    {
      title: 'Education',
      icon: '🎓',
      content: [
        'Master Informatique – Génie Logiciel | Université de Montpellier | 2024-Present',
        'Développement avancé en Java et Spring Boot, Architecture logicielle et DevOps',
        '',
        'Licence Systèmes Numériques et Données des Objets Connectés | Université d\'Avignon | 2023-2024',
        'Développement logiciel et IHM, Electronique et Informatique embarquée, Cybersécurité',
        '',
        'DUT Génie Informatique | Ecole Supérieure De Technologie Sidi Bennour | 2020-2022',
        'Programmation Orientée Objet (C++/JAVA), Systèmes d\'exploitation, Réseaux informatiques'
      ]
    },
    {
      title: 'Professional Experience',
      icon: '💼',
      content: [
        'Web Developer | Mon centre référence | Nov 2023 - Sep 2024',
        '- Conception et développement de logiciels pédagogiques',
        '- Création de solutions de gestion financière sur mesure',
        '- Gestion des environnements Linux et configuration serveur',
        '',
        'IT Technician | Agence du bassin hydraulique | Apr 2022 - Jun 2022',
        '- Déploiement de machines virtuelles (Icinga)',
        '- Analyse et sécurisation des programmes internes',
        '- Configuration de systèmes Linux',
        '',
        'IT Technician | IVENTEQ | Jun 2021 - Jul 2021',
        '- Assistance et support informatique',
        '- Recommandations d\'amélioration matérielle',
        '- Prise en main du framework Metasploit'
      ]
    },
    {
      title: 'Technical Skills',
      icon: '💻',
      content: [
        'Languages: Java, JavaScript, C/C++, SQL, PHP, HTML/CSS',
        'Frameworks: React, Spring Boot, Node.js, .NET',
        'Tools: Docker, Azure, Linux, Git, Icinga, Metasploit',
        'Cloud: Microsoft Azure, Cloud Computing',
        'Cybersecurity: Malware analysis, Intrusion detection, Data encryption'
      ]
    },
    {
      title: 'Soft Skills',
      icon: '🤝',
      content: [
        'Gestion de projet informatique',
        'Collaboration et travail d\'équipe',
        'Adaptabilité professionnelle',
        'Gestion relationnelle',
        'Analyse et résolution de problèmes'
      ]
    },
    {
      title: 'Languages',
      icon: '🌐',
      content: [
        'French: Native (DELF B2)',
        'English: Professional working proficiency'
      ]
    }
  ];
  
  let y = 40;
  sections.forEach(section => {
    // Section header
    doc.setFontSize(14);
    doc.setTextColor(40, 53, 147);
    doc.text(`${section.icon} ${section.title}`, 20, y);
    y += 8;
    
    // Section content
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    section.content.forEach(line => {
      if (line.startsWith('- ')) {
        doc.text('• ' + line.substring(2), 25, y);
      } else {
        doc.text(line, 20, y);
      }
      y += 6;
    });
    y += 10;
  });
  
  // Footer
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text('Portfolio: https://your-portfolio-domain.com', 105, 280, null, null, 'center');
  
  doc.save('CHAHRAOUI_Idriss_Resume.pdf');
};