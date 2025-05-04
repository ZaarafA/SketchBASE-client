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
                return {id: snap.id,userId,...snap.data()};
            });
    } catch (error) {
        console.error("searchServicesByTags error:", error);
        return [];
    }
}

export async function searchServicesByAllTags(tagsString) {
    try {
        const tags = tagsString.split(",").map(t => t.trim()).filter(Boolean);
        if (tags.length === 0) return [];

        // fetch each tag doc
        const tagSnaps = await Promise.all(
            tags.map(tag => getDoc(doc(db, "Service_Tags", tag)))
        );
        // build array of service-ref lists
        const lists = tagSnaps.map(snap =>
            snap.exists() ? snap.data().services || [] : []
        );
        if (lists.some(list => list.length === 0)) {
            return [];
        }
        // intersect all lists by path
        let intersection = lists[0];
        for (let i = 1; i < lists.length; i++) {
            const current = lists[i];
            const currentPaths = new Set(current.map(r => r.path));
            intersection = intersection.filter(r => currentPaths.has(r.path));
        }
        // remove duplicates
        const uniqueRefs = Array.from(
            new Map(intersection.map(r => [r.path, r])).values()
        );
        // fetch each intersected service doc
        const serviceSnaps = await Promise.all(
            uniqueRefs.map(ref => getDoc(ref))
        );
        return serviceSnaps
            .map((snap, i) => ({ snap, ref: uniqueRefs[i] }))
            .filter(({ snap }) => snap.exists())
            .map(({ snap, ref }) => {
                const [, userId] = ref.path.split("/");
                return { id: snap.id, userId, ...snap.data() };
            });
    } catch (error) {
        console.error("searchServicesByAllTags error:", error);
        return [];
    }
}