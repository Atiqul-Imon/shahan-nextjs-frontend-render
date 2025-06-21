export const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Shahan Ahmed",
      "url": "https://shahanahmed.com",
      "sameAs": [
        "https://www.linkedin.com/in/shahan-ahmed-dev/",
        "https://github.com/shahanahmed64",
        "https://twitter.com/shahanahmed"
      ],
      "jobTitle": "Full Stack Developer",
      "worksFor": {
        "@type": "Organization",
        "name": "Self-employed"
      },
      "image": "https://shahanahmed.com/shahan_ahmed.png",
      "description": "Full-stack developer specializing in React, Node.js, and modern web technologies. Tech enthusiast and content creator."
    };
  }; 