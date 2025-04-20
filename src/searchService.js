import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function searchServicesByTags(tagsString) {
    try {
        const tags = tagsString.split(",").map(t => t.trim()).filter(Boolean);
        if (tags.length === 0) return [];

        // fetch each tag doc
        const tagSnaps = await Promise.all(
            tags.map(tag => getDoc(doc(db, "Service_Tags", tag)))
        );
        // get all references from the tag docs
        const allRefs = tagSnaps.flatMap(snap => {
            if (!snap.exists()) return [];
            return snap.data().services || [];
        });
        // remove duplicates
        const uniqueRefs = Array.from(
            new Map(allRefs.map(r => [r.path, r])).values()
        );
        // follow refs to original doc
        const serviceSnaps = await Promise.all(
            uniqueRefs.map(ref => getDoc(ref))
        );
        // return id, data, and extract uid from path
        return serviceSnaps
            .map((snap, i) => ({ snap, ref: uniqueRefs[i] }))
            .filter(({ snap }) => snap.exists())
            .map(({ snap, ref }) => {
                // ref.path: Users/{uid}/userServices/{serviceId}
                const [, userId] = ref.path.split("/");
                return {
                    id: snap.id,userId,...snap.data()};
            });
    } catch (error) {
        console.error("searchServicesByTags error:", error);
        return [];
    }
}
