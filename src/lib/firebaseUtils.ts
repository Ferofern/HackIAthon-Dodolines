import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./firebase";

export const getCompanyFinancialData = async (ruc: string) => {
  if (!ruc) return null;
  try {
    const docRef = doc(firestore, "companies", ruc);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching Firestore data:", error);
    return null;
  }
};