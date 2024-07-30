import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  language: string;
  date: string;
  avarage: number;
}

export const Card = ({
  title,
  description,
  imageUrl,
  avarage,
  date,
  language,
}: CardProps) => {
  return (
    <section className="mt-4 overflow-hidden rounded-md bg-white shadow-[0_8px_16px_0px_#6264F03D]">
      <img
        className="h-80 w-full"
        src={`https://image.tmdb.org/t/p/w500/${imageUrl}`}
        alt={title}
      />

      <main className="flex h-64 flex-col justify-between p-4">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>

          <span>
            <span className="text-xs font-bold text-primary-100">
              {avarage}
            </span>
            /10
          </span>
        </header>

        <p className="my-5 text-sm text-gray-400">
          {description.slice(0, 100)}...
        </p>

        <footer>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Last Update</span>
            <span className="text-sm text-gray-500">Language</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-800">{date}</span>
            <span className="text-sm text-gray-800">{language}</span>
          </div>
        </footer>
      </main>
    </section>
  );
};
