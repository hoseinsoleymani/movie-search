/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
   extend: {
     colors: {

       primary: {
   
       50: '#EFF6FF',
       100: '#3B82F6',
       200: '#BFDBFE',
       300: '#93C5FD',
       400: '#60A5FA',
       500: '',  // Primary Blue
       600: '#2563EB',
       700: '#1D4ED8',
       800: '#1E40AF',
       900: '#1E3A8A',
     
       }
     }
   }
    },
    plugins: [],
}
