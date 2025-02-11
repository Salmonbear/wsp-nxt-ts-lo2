import React from 'react';
import Head from 'next/head';

export default function CustomApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WJL7KBJT');
            `,
          }}
        />

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

        {/* Inline Scripts (Crisp, Heap, Hotjar, etc.) */}
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

        {/* PostHog Snippet */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
              posthog.init('phc_mtGpYb6LHX7UBMi7JLH06ka8ttKaBJ8vXtwSZA6Z490', {
                api_host: 'https://eu.i.posthog.com',
                person_profiles: 'identified_only', // or 'always'
              });
            `,
          }}
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
