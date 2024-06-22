import { Inter } from "next/font/google";
import MultiStepForms from "@/components/MultiStepForms";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <MultiStepForms />
  );
}
