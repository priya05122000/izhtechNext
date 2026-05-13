// src/services/contactService.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface ContactModel {
    email?: string;
    message?: string;
}

export async function createContact(payload: ContactModel) {

    try {

        const res = await fetch(
            `${API_BASE_URL}/api/contact`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(payload),
            }
        );

        if (!res.ok) {

            console.error("Create Contact API failed:", res.status);

            return {
                success: false,
                data: null,
            };
        }

        const json = await res.json();

        return {
            success: true,
            data: json,
        };

    } catch (error) {

        console.error("Create contact error:", error);

        return {
            success: false,
            data: null,
        };
    }
}