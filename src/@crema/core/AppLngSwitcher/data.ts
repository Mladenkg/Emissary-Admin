export interface LanguageProps {
  languageId: string;
  locale: string;
  name: string;
}

const languageData: LanguageProps[] = [
  {
    languageId: "english",
    locale: "en",
    name: "English",
  },
  {
    languageId: "french",
    locale: "fr",
    name: "français",
  },
];
export default languageData;
