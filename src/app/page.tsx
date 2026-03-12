import { BusinessCardStudio } from "@/components/BusinessCardStudio";
import { defaultBusinessCardData } from "@/data/defaultCardData";

export default function Home() {
  return <BusinessCardStudio initialData={defaultBusinessCardData} />;
}
