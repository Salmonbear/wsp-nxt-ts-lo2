import React from 'react';
import Head from 'next/head';

export default function CustomApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Existing Scripts */}
        <script 
          defer 
          data-domain="weddingspeechpro.io" 
          src="https://plausible.io/js/script.js"
        />
        <script 
          defer 
          src="https://client.crisp.chat/l.js"
        />
        <script 
          defer 
          src="https://cdn.heapanalytics.com/js/heap-902320288.js"
        />

        {/* Inline Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Crisp and Heap scripts
              window.$crisp = [];
              window.CRISP_WEBSITE_ID = "ad2ff61b-ed8d-49c9-bb5e-035c5a76f901";
              window.heap=window.heap||[];
              heap.load=function(e,t){
                window.heap.appid=e,window.heap.config=t=t||{};
                for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},
                p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
                heap.load("902320288");

              // Hotjar Tracking Code
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3696670,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
