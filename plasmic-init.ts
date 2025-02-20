import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { registerComponent } from '@plasmicapp/host';
import Busted from './components/Busted';
import WeddingSpeechBusted from './components/WeddingSpeechBusted';

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "sj7u5T6A4j1Xdo61ZkYEWA",
      token: "Hxp1LS2zUfzag9MIPjMeS0nj4VLRV2umxtkMtyT9OcmWIfpMm1oBUMlOPxMXeAaGJzEY86uoNQwjG7D96w",
    },
  ],
  preview: true,
});

// Register the Busted component
registerComponent(Busted, {
  name: "Busted",
  importPath: "@/components/busted",  // Using Next.js path alias
  // or use the full relative path like "./components/busted"
  providesData: true,
  isDefaultExport: true,
  props: {
    title: "string",
    description: "string",
    buttonText: "string",
    workingText: "string",
    bustedText: "string",
    initialState: "boolean"
  },
  }
);

// Register the WeddingSpeechBusted component
registerComponent(WeddingSpeechBusted, {
  name: "WeddingSpeechBusted",
  importPath: "@/components/WeddingSpeechBusted",
  isDefaultExport: true,
  props: {
    title: {
      type: "string",
      defaultValue: "Wedding Speech Generator"
    },
    description: {
      type: "string",
      defaultValue: "Answer a few questions and I'll help create your perfect wedding speech"
    },
    buttonText: {
      type: "string",
      defaultValue: "Start Writing"
    },
    workingText: {
      type: "string",
      defaultValue: "Thinking..."
    },
    bustedText: {
      type: "string",
      defaultValue: "Something went wrong. Please try again."
    },
    initialState: {
      type: "boolean",
      defaultValue: true
    },
    className: {
      type: "string",
      defaultValue: ""
    }
  }
});