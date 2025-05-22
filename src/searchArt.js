import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// returns artwork links that matches ANY of the tags
export async function searchArtByTags(tagsString) {
    try {
        const tags = tagsString.split(",").map(t => t.trim().toLowerCase()).filter(Boolean);
        if (tags.length === 0) return [];

        // fetch each tag document
        const tagSnapshot = await getDocs(collection(db, "Search_Tags"));
        const lookup = {};
        tagSnapshot.docs.forEach(docSnap => {
            lookup[docSnap.id.toLowerCase()] = docSnap.data().images || [];
        });
        // grab tag list
        const allLinks = tags.flatMap(tag => lookup[tag] || []);

        return Array.from(new Set(allLinks));
    
    } catch (error) {
        console.error("searchArtByTags error:", error);
        return [];
    }
}
