import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

// returns artwork links that matches ANY of the tags
export async function searchArtByTags(tagsString) {
    try {
        const tags = tagsString.split(",").map(t => t.trim()).filter(Boolean);
        if (tags.length === 0) return [];

        // fetch each tag document
        const tagSnaps = await Promise.all(
            tags.map(tag => getDoc(doc(db, "Search_Tags", tag)))
        );

        const allLinks = tagSnaps.flatMap(snap => {
            if (!snap.exists()) return [];
            return snap.data().images || [];
        });
        // filter duplicates
        return Array.from(new Set(allLinks));
    
    } catch (error) {
        console.error("searchArtByTags error:", error);
        return [];
    }
}
