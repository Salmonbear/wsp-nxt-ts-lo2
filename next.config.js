/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turn off React StrictMode for now, as react-aria (used by Plasmic)
  // has some troubles with it. See
  // https://github.com/adobe/react-spectrum/labels/strict%20mode
  reactStrictMode: false,

  async redirects() {
    return [
      {
        source: '/wedding-speech',
        destination: '/guide/wedding-speech',
        permanent: true,
      },
      {
        source: '/wedding-speech/maid-of-honor',
        destination: '/guides/maid-of-honor-speech',
        permanent: true,
      },
      {
        source: '/wedding-speech/best-man',
        destination: '/guides/best-man-speech',
        permanent: true,
      },
      {
        source: '/maid-of-honor-speech/examples-for-sister',
        destination: '/guides/maid-of-honor-speech-examples-for-sister',
        permanent: true,
      },
      {
        source: '/maid-of-honor/examples-for-sister',
        destination: '/guides/maid-of-honor-speech-examples-for-sister',
        permanent: true,
      },
      {
        source: '/maid-of-honor/examples-for-older-sister',
        destination: '/guides/maid-of-honor-speech-examples-for-older-sister',
        permanent: true,
      },
      {
        source: '/maid-of-honor/examples-for-younger-sister',
        destination: '/guides/maid-of-honor-speech-examples-for-younger-sister',
        permanent: true,
      },
      {
        source: '/maid-of-honor/examples-for-sister-in-law',
        destination: '/guides/maid-of-honor-speech-examples-for-sister-in-law',
        permanent: true,
      },
      {
        source: '/maid-of-honor/examples-for-mom',
        destination: '/guides/maid-of-honor-speech-examples-for-mom',
        permanent: true,
      },
      {
        source: '/maid-of-honor/ai-speech-generator',
        destination: '/guides/maid-of-honor-ai-speech-generator',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
