export const postComplaint = async (body) => {
    const res = await fetch($`{import.meta.env.VITE_BACKEND_API}/whomtocall`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (res.status === 429) {
        const data = await res.json();
        throw new Error(data.error || "You've reached the request limit.Please wait.");
    }

    if (!res.ok) {
        throw new Error("Something went wrong, Failed to submit complaint");
    }

    return res.json();
};
