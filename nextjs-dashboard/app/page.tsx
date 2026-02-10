'use client';

import { useState } from 'react';
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import styles from '@/app/ui/home.module.css';
import dynamic from 'next/dynamic';

const CodeSampleModal = dynamic(() => import('@/app/ui/components/CodeSampleModal'), {
  ssr: false,
});

const countries = [
  { name: 'Spain' },
  { name: 'Portugal' },
  { name: 'France' },
  { name: 'Italy' }
];

export default function Page() {
  const [results, setResults] = useState(countries);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
         <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Buscador Dinámico:</label>
            <input
              type="text"
              placeholder="Country search..."
              className={styles.input}
              onChange={async (e) => {
                const { value } = e.currentTarget;
                const Fuse = (await import('fuse.js')).default;
                const _ = (await import('lodash')).default;
                
                const fuse = new Fuse(countries, {
                  keys: ['name'],
                  threshold: 0.3,
                });
             
                const searchResult = fuse.search(value).map((result) => result.item);
                const updatedResults = searchResult.length ? searchResult : countries;
                
                setResults(updatedResults);
             
                console.info({ searchedAt: _.now() });
              }}
            />
            <ul className="text-xs text-gray-500 mt-2">
              {results.map((c, i) => <li key={i}>{c.name}</li>)}
            </ul>
          </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Ver ejemplo de código
        </button>
        <div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black"/>
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src='/hero-desktop.png'
            width={1000}
            height={760}
            className='hidden md:block'
            alt='Screenshots of the dashboard project showing desktop version'
            priority
          />
          <Image
            src='/hero-mobile.png'
            width={560}
            height={620}
            className='block md:hidden'
            alt='Screenshots of the dashboard project showing mobile version'
            priority
          />
        </div>
      </div>
      {
        isModalOpen && (
          <CodeSampleModal
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
          />
        )
      }
    </main>
  );
}
