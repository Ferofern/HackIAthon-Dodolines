import { ref, get, child } from "firebase/database";
import { database } from "./firebase";

export const fetchCompanyDataByRUC = async (ruc: string) => {
  if (!ruc) return null;
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `companies/${ruc}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
