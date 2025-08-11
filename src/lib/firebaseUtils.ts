// firebaseUtils.ts
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./firebase";

export const getCompanyFinancialData = async (ruc: string) => {
  if (!ruc) return null;
  try {
    const docRef = doc(firestore, "pymes_2023_2024", ruc);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      return {
        currentYearData: data.anio?.["2024"] ?? null,
        previousYearData: data.anio?.["2023"] ?? null,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching Firestore data:", error);
    return null;
  }
};
