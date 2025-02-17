import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { registerComponent } from '@plasmicapp/host';
import Busted from './components/busted'; // Adjust the import path as needed
import WeddingSpeechForm from "./components/WeddingSpeechForm";


export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "sj7u5T6A4j1Xdo61ZkYEWA",
      token: "Hxp1LS2zUfzag9MIPjMeS0nj4VLRV2umxtkMtyT9OcmWIfpMm1oBUMlOPxMXeAaGJzEY86uoNQwjG7D96w",
    },
  ],

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
  preview: true,
});

// Register the Busted test component
PLASMIC.registerComponent(Busted, {
  name: 'Busted',
  props: {
    initialState: {
      type: 'boolean',
      description: 'Initial working state of the component',
      defaultValueHint: false
    },
    title: {
      type: 'string',
      description: 'Title text to display',
      defaultValueHint: 'Busted Test Component'
    }
  },
  // Making sure Plasmic knows which prop handles the className
  classNameProp: 'className',
  styleSections: true,
  // Adding some default styles
  defaultStyles: {
    width: '100%',
    maxWidth: '400px'
  }
});

// Register the Wedding Speech component
PLASMIC.registerComponent(WeddingSpeechForm, {
  name: 'WeddingSpeechForm',
  props: {
    onComplete: {
      type: 'object',
      description: 'Callback function when form is completed'
    },
    className: {
      type: 'string',
      description: 'Additional CSS classes',
      defaultValueHint: ''
    }
  },
  // These are the internal form fields that will be managed by the component
  importPath: './components/WeddingSpeechForm',
  defaultStyles: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto'
  }
});
// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

// PLASMIC.registerComponent(...);
