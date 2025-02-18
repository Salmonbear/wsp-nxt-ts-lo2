import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { registerComponent } from '@plasmicapp/host';
import Busted from './components/busted';

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
  defaultExport: true,
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