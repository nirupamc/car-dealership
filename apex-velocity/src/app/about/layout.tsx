import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Titan Motors | Curating Automotive Legacies | Hyderabad",
    description:
        "Since 2018, Titan Motors has redefined the luxury pre-owned experience through unparalleled curation, 151-point certification, and white-glove concierge service.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
