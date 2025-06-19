import React from 'react';

/**
 * This component adds a JSON-LD script to the head of the document.
 * It explicitly tells search engines that this website represents a Person,
 * detailing their name, URL, and social profiles. This is highly effective
 * for personal branding and ranking for your name.
 */
const JsonLdSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Idriss Chahraoui',
    url: 'https://my-portfolio-jbew.vercel.app', // Replace with your final domain
    sameAs: [
      'https://github.com/pithop',
      'https://gitlab.com/chahraouiidriss',
      // Add your LinkedIn URL here
      'https://www.linkedin.com/in/chahraoui-idriss-9356a722a',
    ],
    jobTitle: 'Software Engineer',
    alumniOf: 'University of Montpellier',
    knowsAbout: [
      'Software Development',
      'Java',
      'Spring Boot',
      'React',
      'Next.js',
      'Cloud Computing',
      'DevOps',
      'Artificial Intelligence',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default JsonLdSchema;
