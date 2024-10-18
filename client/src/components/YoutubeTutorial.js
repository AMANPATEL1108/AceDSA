import React from 'react';
import { Youtube } from 'lucide-react';

const YouTubeTutorial = ({ url }) => {
  if (!url) return null;

  const videoId = url.split('v=')[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Youtube className="w-6 h-6 text-red-500" />
        <span>Video Tutorial</span>
      </h2>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={embedUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default YouTubeTutorial;